import { useState } from "react";
import { Link } from "react-router-dom";
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken['token']>('');

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
        }
    });

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token);
    };

    const handleComplete = (token: ConfirmToken['token']) => mutate({ token });

  return (
        <div className=" bg-[#f8f9fc] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 space-y-6 transition-all duration-300 hover:shadow-md">
                <div className="text-center">
                    <div className="mb-5">
                        <div className="bg-[#6a7bff] w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#2d3748]">Confirma tu cuenta</h1>
                        <p className="mt-2 text-sm text-[#718096]">
                            Ingresa el código de 6 dígitos que recibiste en tu email
                        </p>
                    </div>
                    
                    <div className="flex justify-center gap-2 mb-6">
                        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                            <PinInputField className="w-10 h-10 text-center border border-[#e2e8f0] rounded-lg focus:border-[#6a7bff] focus:ring-2 focus:ring-[#6a7bff]/30 transition-all" />
                            <PinInputField className="w-10 h-10 text-center border border-[#e2e8f0] rounded-lg focus:border-[#6a7bff] focus:ring-2 focus:ring-[#6a7bff]/30 transition-all" />
                            <PinInputField className="w-10 h-10 text-center border border-[#e2e8f0] rounded-lg focus:border-[#6a7bff] focus:ring-2 focus:ring-[#6a7bff]/30 transition-all" />
                            <PinInputField className="w-10 h-10 text-center border border-[#e2e8f0] rounded-lg focus:border-[#6a7bff] focus:ring-2 focus:ring-[#6a7bff]/30 transition-all" />
                            <PinInputField className="w-10 h-10 text-center border border-[#e2e8f0] rounded-lg focus:border-[#6a7bff] focus:ring-2 focus:ring-[#6a7bff]/30 transition-all" />
                            <PinInputField className="w-10 h-10 text-center border border-[#e2e8f0] rounded-lg focus:border-[#6a7bff] focus:ring-2 focus:ring-[#6a7bff]/30 transition-all" />
                        </PinInput>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button 
                            onClick={() => mutate({ token })}
                            className="px-5 py-2.5 bg-[#6a7bff] text-white rounded-lg font-medium hover:bg-[#5a6be5] transition-colors shadow-sm w-full sm:w-auto"
                        >
                            Confirmar cuenta
                        </button>
                        
                        <div className="text-sm text-[#718096]">
                            ¿No recibiste el código?{' '}
                            <Link 
                                to="/auth/request-code" 
                                className="font-medium text-[#6a7bff] hover:text-[#5a6be5] transition-colors"
                            >
                                Reenviar
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-[#e2e8f0] pt-4 mt-4 text-center">
                    <Link to="/auth/login" className="text-sm text-[#6a7bff] hover:underline">
                        ← Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}