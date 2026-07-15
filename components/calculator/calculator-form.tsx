"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Sex } from "@/lib/growth-calculator";
import { strings } from "@/lib/strings";

const calculatorSchema = z.object({
  ageMonths: z
    .number({ error: "Usia wajib diisi" })
    .int("Usia harus bilangan bulat")
    .min(0, "Usia minimal 0 bulan")
    .max(60, "Usia maksimal 60 bulan"),
  weightKg: z
    .number({ error: "Berat badan wajib diisi" })
    .min(1, "Berat minimal 1,0 kg")
    .max(30, "Berat maksimal 30,0 kg"),
  heightCm: z
    .number({ error: "Tinggi badan wajib diisi" })
    .min(30, "Tinggi minimal 30,0 cm")
    .max(130, "Tinggi maksimal 130,0 cm"),
  sex: z.enum(["male", "female"], { error: "Pilih jenis kelamin" }),
});

export type CalculatorFormValues = z.infer<typeof calculatorSchema>;

type Props = {
  onSubmit: (values: CalculatorFormValues) => void;
};

export function CalculatorForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema as never) as Resolver<CalculatorFormValues>,
    defaultValues: {
      ageMonths: undefined,
      weightKg: undefined,
      heightCm: undefined,
      sex: undefined,
    },
    mode: "onBlur",
  });

  const sex = watch("sex");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5"
      noValidate
    >
      <div className="grid gap-2">
        <Label htmlFor="ageMonths">{strings.fieldAge}</Label>
        <Input
          id="ageMonths"
          type="number"
          inputMode="numeric"
          min={0}
          max={60}
          step={1}
          className="h-12 text-base"
          aria-invalid={!!errors.ageMonths}
          {...register("ageMonths", { valueAsNumber: true })}
        />
        {errors.ageMonths ? (
          <p className="text-sm text-destructive">{errors.ageMonths.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="weightKg">{strings.fieldWeight}</Label>
        <Input
          id="weightKg"
          type="number"
          inputMode="decimal"
          min={1}
          max={30}
          step={0.1}
          className="h-12 text-base"
          aria-invalid={!!errors.weightKg}
          {...register("weightKg", { valueAsNumber: true })}
        />
        {errors.weightKg ? (
          <p className="text-sm text-destructive">{errors.weightKg.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="heightCm">{strings.fieldHeight}</Label>
        <Input
          id="heightCm"
          type="number"
          inputMode="decimal"
          min={30}
          max={130}
          step={0.1}
          className="h-12 text-base"
          aria-invalid={!!errors.heightCm}
          {...register("heightCm", { valueAsNumber: true })}
        />
        {errors.heightCm ? (
          <p className="text-sm text-destructive">{errors.heightCm.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label id="sex-label">{strings.fieldSex}</Label>
        <ToggleGroup
          value={sex ? [sex] : []}
          onValueChange={(value) => {
            const next = value[0] as Sex | undefined;
            if (next) {
              setValue("sex", next, { shouldValidate: true, shouldDirty: true });
            }
          }}
          aria-labelledby="sex-label"
          className="grid w-full grid-cols-2 gap-2"
        >
          <ToggleGroupItem
            value="male"
            className="h-12 min-h-11 border border-border px-3 text-sm data-[pressed]:border-primary data-[pressed]:bg-primary data-[pressed]:text-primary-foreground"
          >
            {strings.sexMale}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="female"
            className="h-12 min-h-11 border border-border px-3 text-sm data-[pressed]:border-primary data-[pressed]:bg-primary data-[pressed]:text-primary-foreground"
          >
            {strings.sexFemale}
          </ToggleGroupItem>
        </ToggleGroup>
        {errors.sex ? (
          <p className="text-sm text-destructive">{errors.sex.message}</p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="h-12 w-full text-base">
        {strings.submitCalculate}
      </Button>
    </form>
  );
}
