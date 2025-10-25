"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserId } from "@/lib/get-id";

const addressSchema = z.object({
  cep: z.string().min(8, "CEP deve ter pelo menos 8 caracteres"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número da casa é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  country: z.string().min(1, "País é obrigatório"),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function Address() {
  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const router = useRouter();

  async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 8) value = value.slice(0, 8);

    // Formata o CEP com o traço
    const formattedCep = value.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
    setCep(formattedCep);
    if (value.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await res.json();

        if (data.erro) {
          setError("cep", { message: "CEP inváilido" });
          setAddress({ street: "", neighborhood: "", city: "", state: "" });
          return;
        }

        setAddress({
          street: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || "",
        });
      } catch (err) {
        console.error("Erro ao buscar o CEP:", err);
      }
    }
  }

  async function onSubmit(data: AddressFormData) {
    console.log("Endereço enviado:", data);
    try {
      const addressResponse = await api.post(
        "/address/create",
        {
          cep: data.cep.replace(/\D/g, ""),
          road: data.street.trim(),
          house_number: data.number,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          country: data.country,
        },
        { withCredentials: true }
      );

      const addressId = addressResponse.data.address.id;
      const userId = await getUserId();

      await api.put(
        "/user/add-address",
        {
          userId,
          addressId,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Endereço salvo com sucesso!");

      router.push("/congratulations");
    } catch (error) {
      console.error("Erro ao salvar o endereço:", error);
    }
  }

  return (
    <form className="space-y-4 w-87" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="cep">CEP</Label>
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <Input
              id="cep"
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={(e) => {
                handleCepChange(e);
                field.onChange(e);
              }}
              className="mt-2"
              maxLength={9}
            />
          )}
        />
        {errors.cep && (
          <div className="text-red-500 text-sm mt-1">{errors.cep.message}</div>
        )}
      </div>

      <div>
        <Label htmlFor="street">Rua</Label>
        <Input
          id="street"
          type="text"
          placeholder="Rua"
          value={address.street}
          className="mt-2"
          {...register("street")}
          {...(errors.street && (
            <div className="text-red-500 text-sm mt-1">
              {errors.street.message}
            </div>
          ))}
        />
      </div>

      <div>
        <Label htmlFor="street">Número da casa</Label>
        <Input
          id="street"
          type="text"
          placeholder="Número da casa"
          className="mt-2"
          {...register("number")}
        />
        {errors.number && (
          <div className="text-red-500 text-sm mt-1">
            {errors.number.message}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="neighborhood">Bairro</Label>
        <Input
          id="neighborhood"
          type="text"
          placeholder="Bairro"
          value={address.neighborhood}
          className="mt-2"
          {...register("neighborhood")}
        />
        {errors.neighborhood && (
          <div className="text-red-500 text-sm mt-1">
            {errors.neighborhood.message}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="city">Cidade</Label>
        <Input
          id="city"
          type="text"
          placeholder="Cidade"
          value={address.city}
          className="mt-2"
          {...register("city")}
        />
        {errors.city && (
          <div className="text-red-500 text-sm mt-1">{errors.city.message}</div>
        )}
      </div>

      <div>
        <Label htmlFor="state">Estado</Label>
        <Input
          id="state"
          type="text"
          placeholder="UF"
          value={address.state}
          className="mt-2"
          {...register("state")}
        />
        {errors.state && (
          <div className="text-red-500 text-sm mt-1">
            {errors.state.message}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="state">País</Label>
        <Input
          id="state"
          type="text"
          placeholder="País"
          value={address.state && "Brasil"}
          className="mt-2"
          {...register("country")}
        />
        {errors.country && (
          <div className="text-red-500 text-sm mt-1">
            {errors.country.message}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="w-full mt-4 font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Salvar Endereço"}
      </Button>
    </form>
  );
}
