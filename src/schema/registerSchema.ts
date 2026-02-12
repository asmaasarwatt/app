import * as zod from "zod"
export const schema = zod.object({
    name:zod.string().nonempty('Name is requird').min(3,'Name min is 3 char').max(5,'Name max is 5 char'),
    email:zod.string().nonempty('Email is requird').regex(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,'Invalid email'),
    password:zod.string().nonempty('Password is required').regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,'Invalid Password'),
    // password:zod.string().nonempty('Password is required').regex(/^[A-Za-z0-9]{6,}$/,'Invalid Password'),
    rePassword:zod.string().nonempty('repassword is requird'),
       phone:zod.string().nonempty('Phone is requird').regex(/^01[0125][0-9]{8}$/,'Invalid Phone'),

  }).refine((data)=> data.password === data.rePassword , {path:['rePassword'],message:'invalid repassword'
})