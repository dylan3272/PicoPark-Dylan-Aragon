let socket = io({ query: { tipo: "pantalla" } });
let contadorColores = 0;
let nivelActual = 1;

const mapaNivel1 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,10,10,10,10,10,10,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

const mapaNivel2 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,11,11,11,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0,0,0,0,0,0,0,0,0],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

const CONFIG = {
  TAMANO_BLOQUE: 50,
  VELOCIDAD_JUGADOR: 220,
  SALTO_FUERZA: 480,
  GRAVEDAD: 950,
  COLORES_JUGADORES: [0xff0055, 0x00ffcc, 0xb700ff, 0xffea00],
  MAX_JUGADORES: 4, 
  TIEMPO_VICTORIA: 2500, 
  TOTAL_NIVELES: 2,
};

function obtenerMapaActual() {
  if (nivelActual === 1) return mapaNivel1;
  if (nivelActual === 2) return mapaNivel2;
  nivelActual = 1;
  return mapaNivel1;
}

class SceneGame extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGame" });
    this.resetEstado();
  }

  update() {
    if (!this.jugadoresSprites || this.nivelSuperado) return;
    const jugadores = Object.entries(this.jugadoresSprites);
    const totalJugadores = jugadores.length;
    if (totalJugadores === 0) return;

    const afuera = jugadores.filter(([, j]) => !j.adentro);
    if (afuera.length > 0) {
      const sumaX = afuera.reduce((s, [, j]) => s + j.sprite.x, 0);
      const mapAncho = obtenerMapaActual()[0].length * CONFIG.TAMANO_BLOQUE;
      const targetX = Phaser.Math.Clamp(sumaX / afuera.length - 400, 0, mapAncho - 800);
      this.cameras.main.scrollX += (targetX - this.cameras.main.scrollX) * 0.12;
    }

    if (this.equipoTieneLlave && this.llave && this.llave.visible && !this.puertaAbierta) {
      const portador = this.jugadoresSprites[this.jugadorConLlaveId];
      if (portador && !portador.adentro) this.llave.setPosition(portador.sprite.x, portador.sprite.y - 35);
    }

    this.cajas.getChildren().forEach(caja => {
      let empujeDerecha = 0;
      let empujeIzquierda = 0;

      for (const [id, j] of jugadores) {
        const p = j.sprite;
        if (p.body.touching.right && caja.body.touching.left && j.controles.right) empujeDerecha++;
        if (p.body.touching.left && caja.body.touching.right && j.controles.left) empujeIzquierda++;
      }

      if (empujeDerecha >= 2) {
        caja.setVelocityX(100);
      } else if (empujeIzquierda >= 2) {
        caja.setVelocityX(-100);
      } else {
        caja.setVelocityX(0);
      }
    });

    let algunBotonPisado = false; 
    this.botones.getChildren().forEach(btn => {
      let pisado = false;
      this.cajas.getChildren().forEach(caja => {
        if (Phaser.Geom.Intersects.RectangleToRectangle(caja.getBounds(), btn.getBounds())) {
          pisado = true;
        }
      });
      
      if (pisado) {
        btn.setTint(0x777777); 
        algunBotonPisado = true;
      } else {
        btn.clearTint();
      }
    });

    this.puentes.getChildren().forEach(pte => {
      if (algunBotonPisado) {
        pte.body.enable = true; pte.setAlpha(1);
      } else {
        pte.body.enable = false; pte.setAlpha(0.2);
      }
    });

    for (const [id, j] of jugadores) {
      const p = j.sprite;
      if (j.adentro) {
        p.setPosition(this.puerta.x, this.puerta.y).setVelocity(0, 0);
        p.body.allowGravity = false;
        if (j.controles.down) {
          j.adentro = false; p.setVisible(true); p.body.allowGravity = true;
          this.jugadoresAdentro.delete(id);
        }
        continue; 
      }

      if (j.controles.left) p.setAccelerationX(-2500);
      else if (j.controles.right) p.setAccelerationX(2500);
      else p.setAccelerationX(0);

      if (j.controles.jump && p.body.blocked.down) {
        if (this.equipoTieneLlave && this.jugadorConLlaveId === id) {
        } else {
          p.setVelocityY(-CONFIG.SALTO_FUERZA);
        }
        j.controles.jump = false;
      }

      if (this.puerta) {
        const dist = Math.abs(p.x - this.puerta.x) < 40 && Math.abs(p.y - this.puerta.y) < 60;
        if (dist) {
          if (!this.puertaAbierta && this.equipoTieneLlave) {
            this.puertaAbierta = true; this.puerta.setTexture("doorOpen").refreshBody();
          }
          if (this.puertaAbierta && !j.adentro) {
            if (j.controles.up && !j.upPressedLastFrame) {
              j.adentro = true; p.setVisible(false); p.body.allowGravity = false; p.setVelocity(0,0);
              this.jugadoresAdentro.add(id);
            }
            j.upPressedLastFrame = j.controles.up;
          }
        } else { j.upPressedLastFrame = false; }
      }
    }

    if (this.puertaAbierta && totalJugadores > 0 && this.jugadoresAdentro.size >= totalJugadores) {
      this.victoria();
    }
  }

  victoria() {
    if (this.nivelSuperado) return;
    this.nivelSuperado = true;
    this.plataformas.clear(true, true);
    this.cajas.clear(true, true);
    
    const msj = nivelActual < CONFIG.TOTAL_NIVELES ? `¡SECTOR BYPASSEADO!\nSiguiente sector...` : `¡HACKEO EXITOSO! 🎉`;
    this.txtVictoria.setText(msj).setVisible(true);

    this.time.delayedCall(CONFIG.TIEMPO_VICTORIA, () => {
      if (nivelActual < CONFIG.TOTAL_NIVELES) nivelActual++;
      else nivelActual = 1;
      this.scene.restart(); 
    });
  }

  agarrarLlave(a, b) {
    if (this.equipoTieneLlave) return;
    const jSprite = a.texture.key === "player" ? a : b;
    const lSprite = a.texture.key === "nucleo" ? a : b;
    this.equipoTieneLlave = true;
    this.jugadorConLlaveId = jSprite.getData("id");
    lSprite.setVisible(false).body.enable = false;
  }

  respawnEquipo() {
    if (this.nivelSuperado) return;
    this.scene.restart();
  }

  handleInputGame(input) {
    const id = input.idDelSocket;
    const j = this.jugadoresSprites[id];
    if (!j || this.nivelSuperado) return;
    const activo = input.tipoDeEvento === "keydown";
    if (input.teclaPresionada === "ArrowLeft")  j.controles.left  = activo;
    if (input.teclaPresionada === "ArrowRight") j.controles.right = activo;
    if (input.teclaPresionada === "Space")      j.controles.jump  = activo;
    if (input.teclaPresionada === "ArrowUp")    j.controles.up    = activo;
    if (input.teclaPresionada === "ArrowDown")  j.controles.down  = activo;
  }

  create() {
    this.resetEstado();
    this.cameras.main.setBackgroundColor("#0a0a12"); 

    this.crearTextura("ground", 50, 50);
    this.crearTextura("water", 50, 50);
    this.crearTextura("door", 50, 80);
    this.crearTextura("doorOpen", 50, 80);
    this.crearTextura("button", 50, 50);
    this.crearTextura("bridge", 50, 50);
    this.crearTextura("trampoline", 50, 50);
    this.crearTextura("caja", 48, 48);
    this.crearTexturaJugador();
    this.crearTexturaNucleo();

    this.plataformas = this.physics.add.staticGroup();
    this.agua = this.physics.add.staticGroup();
    this.botones = this.physics.add.staticGroup();
    this.puentes = this.physics.add.staticGroup();
    this.trampolines = this.physics.add.staticGroup();
    this.cajas = this.physics.add.group();
    this.grupoJugadores = this.physics.add.group();

    const mapaActual = obtenerMapaActual();
    const tamanoBloque = CONFIG.TAMANO_BLOQUE;
    const mapaAncho = mapaActual[0].length * tamanoBloque;
    const mapaAlto = mapaActual.length * tamanoBloque;

    this.physics.world.setBounds(0, 0, mapaAncho, mapaAlto);
    this.cameras.main.setBounds(0, 0, mapaAncho, mapaAlto);

    this.add.text(20, 20, `NIVEL ${nivelActual}: SISTEMA DE SEGURIDAD`, { fontSize: "20px", fill: "#0fb9b1", fontStyle: "bold" }).setScrollFactor(0);

    this.txtVictoria = this.add
      .text(400, 300, "", { fontSize: "48px", fill: "#0be881", fontStyle: "bold", align: "center", stroke: "#000", strokeThickness: 8 })
      .setOrigin(0.5).setVisible(false).setScrollFactor(0).setDepth(100); 

    for (let y = 0; y < mapaActual.length; y++) {
      for (let x = 0; x < mapaActual[y].length; x++) {
        const tipo = mapaActual[y][x];
        const posX = x * tamanoBloque + tamanoBloque / 2;
        const posY = y * tamanoBloque + tamanoBloque / 2;
        
        if (tipo === 1) this.plataformas.create(posX, posY, "ground");
        else if (tipo === 2) {
          const a = this.agua.create(posX, posY, "water");
          a.body.setSize(50, 15); a.body.setOffset(0, 35); 
        } else if (tipo === 3) {
          this.llaveOriginalX = posX; this.llaveOriginalY = posY;
          this.llave = this.physics.add.sprite(posX, posY, "nucleo").setScale(0.8);
          this.llave.body.allowGravity = false;
        } else if (tipo === 4) {
          this.puerta = this.physics.add.staticSprite(posX, posY - 15, "door").setScale(0.9);
          this.puerta.refreshBody();
        } else if (tipo === 6) {
          const caja = this.cajas.create(posX, posY, "caja");
          caja.setMass(1000);
          caja.setDragX(10000);
          caja.setBounce(0);
        } else if (tipo === 9) { 
          const btn = this.botones.create(posX, posY, "button");
          btn.body.setSize(40, 15); btn.body.setOffset(5, 35);
        } else if (tipo === 10) { 
          const pte = this.puentes.create(posX, posY - 15, "bridge");
          pte.body.setSize(50, 20); pte.body.enable = false; pte.setAlpha(0.2);
        } else if (tipo === 11) { 
          const tramp = this.trampolines.create(posX, posY, "trampoline");
          tramp.body.setSize(50, 25); tramp.body.setOffset(0, 25);
          tramp.setData("estado", "idle"); 
        }
      }
    }

    this.physics.add.collider(this.grupoJugadores, this.plataformas);
    this.physics.add.collider(this.grupoJugadores, this.puentes);
    this.physics.add.collider(this.grupoJugadores, this.trampolines);
    this.physics.add.collider(this.grupoJugadores, this.grupoJugadores);
    this.physics.add.collider(this.grupoJugadores, this.cajas);
    this.physics.add.collider(this.cajas, this.plataformas);
    
    this.physics.add.overlap(this.grupoJugadores, this.agua, this.respawnEquipo, null, this);
    this.physics.add.overlap(this.cajas, this.agua, this.respawnEquipo, null, this);

    if (this.llave) {
      this.physics.add.overlap(this.grupoJugadores, this.llave, this.agarrarLlave, null, this);
    }

    socket.off("inputDeJugador").on("inputDeJugador", this.handleInputGame.bind(this));

    socket.off("jugadorDesconectado").on("jugadorDesconectado", (id) => {
      if (this.jugadoresSprites[id]) {
        this.jugadoresAdentro.delete(id);
        this.jugadoresSprites[id].sprite.destroy();
        delete this.jugadoresSprites[id];
        contadorColores--;
      }
    });

    socket.off("nuevoJugador").on("nuevoJugador", ({ idDelSocket, color }) => {
      if (this.jugadoresSprites[idDelSocket]) return;
      const cant = Object.keys(this.jugadoresSprites).length;
      
      const player = this.grupoJugadores.create(100 + cant * 30, 250, "player");
      player.setData("id", idDelSocket);
      player.setTint(color).setCollideWorldBounds(true).setScale(0.9);
      player.body.setSize(40, 40);
      player.setDragX(2500); 
      player.setMaxVelocity(CONFIG.VELOCIDAD_JUGADOR, 1500);

      this.jugadoresSprites[idDelSocket] = {
        sprite: player,
        controles: { left: false, right: false, jump: false, up: false, down: false },
        adentro: false,
        upPressedLastFrame: false,
      };
      contadorColores++;
    });

    socket.emit("pedirJugadoresConectados");
  }

  resetEstado() {
    this.jugadoresSprites = {};
    this.equipoTieneLlave = false;
    this.jugadorConLlaveId = null;
    this.nivelSuperado = false;
    this.llaveOriginalX = 0;
    this.llaveOriginalY = 0;
    this.llave = null;
    this.puerta = null;
    this.plataformas = null;
    this.agua = null;
    this.botones = null;
    this.puentes = null;
    this.trampolines = null; 
    this.cajas = null;
    this.grupoJugadores = null;
    this.txtVictoria = null;
    this.puertaAbierta = false;
    this.jugadoresAdentro = new Set();
    contadorColores = 0;
  }

  crearTexturaNucleo() {
    if (this.textures.exists("nucleo")) return;
    const canvas = this.textures.createCanvas("nucleo", 30, 30);
    const ctx = canvas.context;
    ctx.fillStyle = "#d2dae2";
    ctx.fillRect(5, 0, 20, 30);
    ctx.fillStyle = "#0be881";
    ctx.fillRect(8, 5, 14, 20);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(12, 10, 6, 10);
    canvas.refresh();
  }

  crearTexturaJugador() {
    if (this.textures.exists("player")) return;
    const canvas = this.textures.createCanvas("player", 40, 40);
    const ctx = canvas.context;
    ctx.fillStyle = "#222222"; 
    ctx.fillRect(0, 0, 40, 40);
    ctx.fillStyle = "#ffffff"; 
    ctx.fillRect(5, 8, 30, 12);
    canvas.refresh();
  }

  crearTextura(key, w, h) {
    if (this.textures.exists(key)) return; 
    const canvas = this.textures.createCanvas(key, w, h);
    if (!canvas) return;
    const ctx = canvas.context;

    if (key === "ground") {
      ctx.fillStyle = "#1e272e"; 
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#ff3f34";
      ctx.fillRect(0, 0, w, 2); ctx.fillRect(0, h - 2, w, 2);
      ctx.fillRect(0, 0, 2, h); ctx.fillRect(w - 2, 0, 2, h);
    } 
    else if (key === "water") {
      ctx.fillStyle = "#0a0a0a"; 
      ctx.fillRect(0, 0, w, h);
      
      ctx.fillStyle = "#39ff14"; 
      ctx.fillRect(0, 12, w, h - 12);
      
      ctx.fillStyle = "#ccff00";
      ctx.fillRect(0, 12, w, 4);

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      
      ctx.beginPath(); 
      ctx.arc(15, 22, 3, 0, Math.PI * 2); 
      ctx.fill();
      
      ctx.beginPath(); 
      ctx.arc(35, 32, 4, 0, Math.PI * 2); 
      ctx.fill();
      
      ctx.beginPath(); 
      ctx.arc(22, 42, 2, 0, Math.PI * 2); 
      ctx.fill();
    }
    else if (key === "door") {
      ctx.fillStyle = "#485460"; 
      ctx.fillRect(5, 5, 40, 75);
      ctx.fillStyle = "#1e272e"; 
      ctx.fillRect(10, 10, 30, 70);
      ctx.fillStyle = "#ff3f34";
      ctx.fillRect(15, 15, 20, 5);
    } 
    else if (key === "doorOpen") {
      ctx.fillStyle = "#485460"; 
      ctx.fillRect(5, 5, 40, 75);
      ctx.fillStyle = "#000000"; 
      ctx.fillRect(10, 10, 30, 70);
      ctx.fillStyle = "#0be881";
      ctx.fillRect(15, 15, 20, 5);
    } 
    else if (key === "button") {
      ctx.fillStyle = "#333"; 
      ctx.fillRect(5, 35, 40, 15);
      ctx.fillStyle = "#ffdd59"; 
      ctx.fillRect(10, 30, 30, 5);
    }
    else if (key === "bridge") {
      ctx.fillStyle = "rgba(15, 185, 177, 0.3)";
      ctx.fillRect(0, 5, w, 10);
      ctx.fillStyle = "#0fb9b1"; 
      ctx.fillRect(0, 3, w, 2);
      ctx.fillRect(0, 15, w, 2);
    }
    else if (key === "trampoline") {
      ctx.fillStyle = "#222"; 
      ctx.fillRect(5, 30, 40, 20);
      ctx.fillStyle = "#0be881"; 
      ctx.fillRect(10, 25, 30, 5);
    }
    else if (key === "caja") {
      ctx.fillStyle = "#808e9b"; 
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#1e272e";
      ctx.fillRect(2, 2, w-4, h-4);
      ctx.fillStyle = "#ffd32a";
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(w, h); ctx.lineWidth=8; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w,0); ctx.lineTo(0, h); ctx.lineWidth=8; ctx.stroke();
    }
    canvas.refresh();
  }
}

const config = {
  type: Phaser.AUTO, width: 800, height: 600, parent: "juego",
  physics: { default: "arcade", arcade: { gravity: { y: CONFIG.GRAVEDAD }, debug: false, fps: 120, overlapBias: 16, separationBias: 10 } },
  scene: [SceneGame],
};
new Phaser.Game(config);