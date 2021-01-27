// http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export const emailValidator = {
    validator: (v: string): boolean => {
        return regEmail.test(v);
    },
    message: (props: any) => `"${props.value}" must be a valid email`
}