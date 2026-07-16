"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { HeadingOne, HeadingThree, Column, Row } from "../../components/styled";
import Input from "../../components/Input";
import { useStepsContext } from "../../lib/steps-context";
import { PersonalInfo } from "../../lib/steps";
import Image from "next/image";
import { useEffect, useState } from "react";

const SELECTOR_OPTIONS = [
  {
    id: 0,
    name: "+421",
    icon: (
      <Image
        src="/images/sk-flag.png"
        alt="Slovakia flag"
        width={20}
        height={20}
        style={{ borderRadius: "9999px" }}
      />
    ),
  },
  {
    id: 1,
    name: "+420",
    icon: (
      <Image
        src="/images/cz-flag.png"
        alt="Czechia flag"
        width={20}
        height={20}
        style={{ borderRadius: "9999px" }}
      />
    ),
  },
];

export default function StepTwoPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { personalInfo, setPersonalInfo, amount, switchOption, selectedShelterId } =
    useStepsContext();

  useEffect(() => {
    if (amount === 0 || (switchOption === "shelter" && !selectedShelterId)) {
      router.push("/steps/one");
    }
  }, [amount, router, selectedShelterId, switchOption]);

  const [phonePrefix, setPhonePrefix] = useState(
    personalInfo?.phone ? personalInfo.phone.substring(0, 4) : "+421",
  );

  const personalInfoSchema = z.object({
    firstName: z
      .string()
      .min(2, t("nameHint"))
      .max(20, t("nameHint"))
      .nonempty(t("nameHint"))
      .transform((value) => (value?.trim() ? value.trim() : "")),
    lastName: z
      .string()
      .min(2, t("lastNameHint"))
      .max(30, t("lastNameHint"))
      .nonempty(t("lastNameHint"))
      .transform((value) => (value?.trim() ? value.trim() : "")),
    email: z
      .string()
      .email(t("emailHint"))
      .nonempty(t("emailHint"))
      .transform((value) => (value?.trim() ? value.trim() : "")),
    phone: z
      .string()
      .optional()
      .transform((value) => (value?.trim() ? value.trim() : undefined))
      .refine((value) => value === undefined || /^\d{3} \d{3} \d{3}$/.test(value), t("phoneHint")),
  });

  type PersonalInfoForm = z.input<typeof personalInfoSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    mode: "onSubmit",
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: personalInfo?.firstName ?? "",
      lastName: personalInfo?.lastName ?? "",
      email: personalInfo?.email ?? "",
      phone: personalInfo?.phone?.substring(5) ?? "",
    },
  });

  const onSubmit = (data: PersonalInfoForm) => {
    const modifiedData: PersonalInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone ? `${phonePrefix} ${data.phone}` : undefined,
    };
    setPersonalInfo(modifiedData);
    router.push("/steps/three");
  };
  return (
    <form id="step2-form" onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: "100%" }}>
      <Column>
        <HeadingOne>{t("step2Title")}</HeadingOne>
        <Column $gap={16}>
          <HeadingThree $marginBottom={0}>{t("step2Description")}</HeadingThree>
          <Row>
            <Input
              placeholder={t("namePlaceholder")}
              {...register("firstName", {
                onBlur: (e) => {
                  setValue("firstName", e.target.value.trim());
                },
              })}
              label={t("nameLabel")}
              hintText={errors.firstName?.message ?? t("nameHint")}
              showHint={!!errors.firstName}
            />
            <Input
              placeholder={t("lastNamePlaceholder")}
              {...register("lastName", {
                onBlur: (e) => {
                  setValue("lastName", e.target.value.trim());
                },
              })}
              label={t("lastNameLabel")}
              hintText={errors.lastName?.message ?? t("lastNameHint")}
              showHint={!!errors.lastName}
            />
          </Row>
          <Input
            placeholder={t("emailPlaceholder")}
            {...register("email", {
              onBlur: (e) => {
                setValue("email", e.target.value.trim());
              },
            })}
            label={t("emailLabel")}
            hintText={errors.email?.message ?? t("emailHint")}
            showHint={!!errors.email}
          />
          <Input
            placeholder={t("phonePlaceholder")}
            {...register("phone", {
              onBlur: (e) => {
                setValue("phone", e.target.value.trim());
                trigger("phone");
              },
            })}
            label={t("phoneLabel")}
            hintText={errors.phone?.message ?? t("phoneHint")}
            showHint={!!errors.phone}
            selectorOptions={SELECTOR_OPTIONS}
            selectedOption={
              phonePrefix
                ? SELECTOR_OPTIONS.find((option) => option.name === phonePrefix)
                : SELECTOR_OPTIONS.find(
                    (option) => option.name === personalInfo?.phone?.substring(0, 4),
                  )
            }
            onSelect={(id) => setPhonePrefix(SELECTOR_OPTIONS[id].name)}
          />
        </Column>
      </Column>
    </form>
  );
}
