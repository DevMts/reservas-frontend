"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { isValidCPF } from "@/lib/utils/is-valid-cpf";

const onlyNumbers = (value: string) => value.replace(/\D/g, "");

const dataSchema = z.object({
  cpf: z.string().length(14, "CPF deve ter 11 dígitos").refine(isValidCPF, {
    message: "CPF inválido",
  }),
  birthdate: z.string().min(10, "Data de nascimento é obrigatória"),
  ddd: z.string().length(2, "DDD deve ter 2 dígitos"),
  phone: z.string().refine(
    (val) => {
      const numbers = onlyNumbers(val);
      return numbers.length === 8 || numbers.length === 9;
    },
    {
      message: "Número de telefone inválido",
    }
  ),
});

type DataForm = z.infer<typeof dataSchema>;

function formatCPF(value: string) {
  return value
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/(\d{3})(\d)/, "$1.$2") // coloca o primeiro ponto
    .replace(/(\d{3})(\d)/, "$1.$2") // coloca o segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // coloca o traço
}

function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, ""); // só números

  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 8) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 9)}`;
}

export default function Dates() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DataForm>({
    resolver: zodResolver(dataSchema),
  });

  const { userId } = useUser();
  !userId && (
    <div className="p-4 text-red-500 text-sm">
      Falha ao carregar usuário. Verifique o console.
    </div>
  );

  const cpfValue = watch("cpf") || "";

  function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCPF(e.target.value);
    setValue("cpf", formatted);
  }

  const phoneValue = watch("phone") || "";

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted); // atualiza o form
  }

  async function onSubmit(data: DataForm) {
    try {
      const response = await api.post(`/user/create/${userId}`, {
        cpf: onlyNumbers(data.cpf),
        date_birth: data.birthdate,
        ddd: data.ddd,
        phone: onlyNumbers(data.phone),
      });

      if (
        response.status.toString().startsWith("4") &&
        response.status.toString().startsWith("5")
      ) {
        throw new Error("Erro ao enviar os dados do formulário");
      }

      toast.success("Dados enviados com sucesso!");

      router.push("/address");
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;

      if (err.response?.data?.error === "CPF already in use") {
        toast.error("Este CPF já está em uso");
        setError("cpf", {
          type: "custom",
          message: "Este CPF já está em uso",
        });
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div>
        <Label htmlFor="cpf" className="mb-1.5 text-sm">
          CPF
        </Label>
        <Input
          className="w-87"
          id="cpf"
          {...register("cpf")}
          onChange={handleCPFChange}
          value={cpfValue}
          maxLength={14}
        />
        {errors.cpf && (
          <div className="mt-1 text-sm text-red-600">{errors.cpf.message}</div>
        )}
      </div>
      <div className="mt-4">
        <Label htmlFor="birthdate" className="mb-1.5 text-sm">
          Data de Nascimento
        </Label>
        <DatePicker
          setValue={setValue}
          className="w-87 hidden"
          id="birthdate"
          type="text"
          {...register("birthdate")}
        />
        {errors.birthdate && (
          <div className="mt-1 text-sm text-red-600">
            {errors.birthdate.message}
          </div>
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Label htmlFor="ddd" className="mb-1.5 text-sm">
            DDD
          </Label>
          <Input className="w-full" id="ddd" {...register("ddd")} />
          {errors.ddd && (
            <div className="mt-1 text-sm text-red-600">
              {errors.ddd.message}
            </div>
          )}
        </div>

        <div className="col-span-2">
          <Label htmlFor="phone" className="mb-1.5 text-sm">
            Telefone
          </Label>
          <Input
            className="w-full"
            id="phone"
            {...register("phone")}
            value={phoneValue}
            onChange={handlePhoneChange}
          />
          {errors.phone && (
            <div className="mt-1 text-sm text-red-600">
              {errors.phone.message}
            </div>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="mt-6 w-87 text-text font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Salvar e continuar"}
      </Button>
    </form>
  );
}
