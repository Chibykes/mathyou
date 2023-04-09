import { useState } from "react";

export default function useAuthUser(user){

    const User = useState(user);
    return User;

}