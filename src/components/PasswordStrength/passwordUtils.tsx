import { TFunction } from "i18next";

export const getPasswordRequirements = (t: TFunction) => {
  return [
    { re: /[0-9]/, label: t("auth:loginForm.password.errors.digit") },
    { re: /^\S+$/, label: t("auth:loginForm.password.errors.spaces") },
    {
      re: /[$&+,:;=?@#|'<>.^*()%!-]/,
      label: t("auth:loginForm.password.errors.symbol"),
    },
    {
      re: /^[a-zA-Z0-9~!?@#$%^&*_+()[\]{}><|"'.,:;/\\ ]+$/,
      label: t("auth:loginForm.password.errors.latin"),
    },
    { re: /[a-z]/, label: t("auth:loginForm.password.errors.lowerCase") },
    { re: /[A-Z]/, label: t("auth:loginForm.password.errors.upperCase") },
  ];
};
export function getStrength(password: string, t: TFunction) {
  let multiplier = password.length > 5 ? 0 : 1;
  const passwordRequirements = getPasswordRequirements(t);
  passwordRequirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(
    100 - (100 / (passwordRequirements.length + 1)) * multiplier,
    0
  );
}
