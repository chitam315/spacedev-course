import { useState } from "react"
import { validate } from "../utils/validate";

/**
 * This hook use to validate form
 * @param {object} rules
 * @return values, error, register, validate
 */
export const useForm = (rules) => {
    const [valuesForm,setValuesForm] = useState({});
    const [errors,setError] = useState({});

    const register = (name) => {
        return {
            value: valuesForm[name] || '',
            onChange: ev => {
                console.log(valuesForm);
                console.log('not yet set value');
                setValuesForm({ ...valuesForm, [name]: ev.target.value })
                console.log(valuesForm);
                console.log('set value');
            },
            error: errors[name]
        }
    }

    const _validate = () => {
        const errObject = validate(rules,valuesForm)
        setError(errObject)
        return Object.keys(errObject).length === 0
    }

    const resetValue = () => {
        setValuesForm({})
    }

return {values: valuesForm,errors,register,validate: _validate,resetValue,setValuesForm}
}