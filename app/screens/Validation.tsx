import * as Yup from "yup";

// https://github.com/jquense/yup
export const RegisterPatientValidation = Yup.object().shape({
  email: Yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  firstName: Yup.string()
    .required("Campo obrigatório")
    .max(15, "O nome deve possuir no máximo 15 caracteres")
    .min(3, "O nome deve possuir no mínimo 3 caracteres"),
  surName: Yup.string()
    .required("Campo obrigatório")
    .max(15, "O sobrenome deve possuir no máximo 15 caracteres")
    .min(3, "O sobrenome deve possuir no mínimo 3 caracteres"),
});
export const AuthValidation = Yup.object().shape({
  email: Yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),

});

export const RegisterValidation = Yup.object().shape({
  email: Yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  confirmPassword: Yup.string()
    .required("Repita a senha")
    .oneOf([Yup.ref("password")], "A senha preenchida não confere"),
});