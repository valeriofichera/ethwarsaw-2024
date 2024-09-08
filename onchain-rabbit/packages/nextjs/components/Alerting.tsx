import React, { useContext, useEffect, useState } from "react";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "./ui/toast";
import { Info, CircleX, TriangleAlert, CircleCheckBig } from "lucide-react";
import { FunnyContext } from "~~/services/funny/funnyContext";

const Alerting = ({ identifier }: { identifier: string }) => {
    const { alert }: any = useContext(FunnyContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (alert && alert.length > 0) {
            setIsLoading(false);
        }
    }, [alert]);

    if (isLoading) return <></>;

    const matchingAlert = alert.find((alertItem: any) => alertItem.identifier === identifier);

    const getAlertStyles = (type: string) => {
        switch (type) {
            case "success":
                return "bg-green-500/60 border-green-800";
            case "info":
                return "bg-slate-500/60 border-slate-800";
            case "error":
                return "bg-red-500/60 border-red-800";
            case "warning":
                return "bg-yellow-500/60 border-yellow-800";
            default:
                return "bg-gray-500/60 border-gray-800";
        }
    };

    const getAlertIcon = (type: string) => {
        switch (type) {
            case "success":
                return <CircleCheckBig className="mr-2" />;
            case "info":
                return <Info className="mr-2" />;
            case "error":
                return <CircleX className="mr-2" />;
            case "warning":
                return <TriangleAlert className="mr-2" />;
            default:
                return null;
        }
    };

    return (
        <ToastProvider>
            <ToastViewport />
            {matchingAlert ? (
                <Toast key={matchingAlert.identifier} variant="default" className={`${getAlertStyles(matchingAlert.type)} border rounded-xl`}>
                    <div className="flex items-center">
                        {getAlertIcon(matchingAlert.type)}
                        <ToastTitle>{matchingAlert.type}</ToastTitle>
                    </div>
                    <ToastDescription>{matchingAlert.identifier}</ToastDescription>
                    <ToastDescription>{matchingAlert.message}</ToastDescription>
                    <ToastClose />
                </Toast>
            ) : (
                <Toast variant="default" className="bg-red-500/60 border-red-800 border rounded-xl">
                    <ToastTitle>Error</ToastTitle>
                    <ToastDescription>No matching record for identifier has been found</ToastDescription>
                    <ToastClose />
                </Toast>
            )}
        </ToastProvider>
    );
};

export default Alerting;