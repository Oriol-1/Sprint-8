import React, { useEffect, useState} from "react";
import { auth } from "../firebase/firebase";

function useAutenticacion(){
    const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(usuario => {
            if(usuario){
                guardarUsuarioAutenticado(usuario);
            }else{
                guardarUsuarioAutenticado(null);
            }
        });
        return () => unsuscribe();
    }, []);

    return usuarioAutenticado;

}

export default useAutenticacion;