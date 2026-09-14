import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";

// 1. Importación de Hooks (Lógica)
import useConexionAlServidor from "@/src/hooks/useConexionAlServidor";
import useControlesDeGamepad from "@/src/hooks/useControlesDeGamepad";
import useEscanerQR from "@/src/hooks/useEscanerQR";

// 2. Importación de Componentes (Vistas)
import ContenedorDeGamepad from "@/src/componentes/contenedores/ContenedorDeGamepad";
import FormularioDeConexion from "@/src/componentes/contenidos/FormularioDeConexion";
import PantallaDeEscaneoQR from "@/src/componentes/contenidos/PantallaDeEscaneoQR";

export default function App() {
  // --- A. Estado de Conexión ---
  const {
    estaConectado,
    direccionIp,
    setDireccionIp,
    conectarAlServidor,
    desconectarDelServidor,
    enviarEventoDeControl,
  } = useConexionAlServidor();

  // --- B. Configuración del Gamepad ---
  const {
    layoutDpad,
    layoutBotonSalto,
    layoutBotonArriba,
    layoutBotonAbajo,
    layoutBotonIzquierda,
    layoutBotonDerecha,
    capturarLayoutDeZona,
    procesarToques,
  } = useControlesDeGamepad(
    (tecla) => enviarEventoDeControl("keydown", tecla),
    (tecla) => enviarEventoDeControl("keyup", tecla)
  );

  // --- C. Lógica del Escáner QR ---
  const handleIpEscaneada = useCallback((ip) => {
    setDireccionIp(ip);
    conectarAlServidor(ip);
  }, [setDireccionIp, conectarAlServidor]);

  const { 
    estaEscaneando, 
    abrirEscanerQR, 
    cerrarEscanerQR, 
    handleQREscaneado 
  } = useEscanerQR(handleIpEscaneada);


  // --- D. Sistema de Enrutamiento Interno ---
  const renderizarPantallaActiva = () => {
    
    // Escenario 1: El jugador ya está conectado al juego
    if (estaConectado) {
      return (
        <ContenedorDeGamepad
          onSalir={desconectarDelServidor}
          onCapturarLayoutDpad={capturarLayoutDeZona(layoutDpad)}
          onCapturarLayoutArriba={capturarLayoutDeZona(layoutBotonArriba)}
          onCapturarLayoutAbajo={capturarLayoutDeZona(layoutBotonAbajo)}
          onCapturarLayoutIzquierda={capturarLayoutDeZona(layoutBotonIzquierda)}
          onCapturarLayoutDerecha={capturarLayoutDeZona(layoutBotonDerecha)}
          onCapturarLayoutSalto={capturarLayoutDeZona(layoutBotonSalto)}
          onProcesarToques={procesarToques}
        />
      );
    }

    // Escenario 2: El usuario abrió la cámara para escanear
    if (estaEscaneando) {
      return (
        <PantallaDeEscaneoQR
          onQREscaneado={handleQREscaneado}
          onCancelar={cerrarEscanerQR}
        />
      );
    }

    // Escenario 3 (Por defecto): Pantalla de inicio pidiendo IP
    return (
      <FormularioDeConexion
        direccionIp={direccionIp}
        onCambiarIp={setDireccionIp}
        onConectarConIp={() => conectarAlServidor()}
        onAbrirEscanerQR={abrirEscanerQR}
      />
    );
  };

  // --- E. Renderizado Principal ---
  return (
    <>
      <StatusBar hidden={true} />
      {renderizarPantallaActiva()}
    </>
  );
}