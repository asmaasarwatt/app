import * as zod from "zod"
export const loginSchema = zod.object({
    email:zod.string().nonempty('Email is requird').regex(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,'Invalid email'),
     password:zod.string().nonempty('Password is requird').regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,'Invalid Password'),
    //  password:zod.string().nonempty('Password is requird').regex(/^[A-Za-z0-9]{6,}$/,'Invalid Password'),

})