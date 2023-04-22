import * as Yup from "yup";

// https://github.com/jquense/yup

export const AuthValidation = Yup.object().shape({
  email: Yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  password: Yup.string()
    .required("Campo obrigatório")
    .min(8, "A senha deve possuir ao menos 8 caracteres"),
});

export const RegisterValidation = Yup.object().shape({
  email: Yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  password: Yup.string()
    .min(8)
    .required("Campo obrigatório"),
  confirmPassword: Yup.string()
    .required("Repita a senha")
    .oneOf([Yup.ref("password")], "A senha preenchida não confere"),
});