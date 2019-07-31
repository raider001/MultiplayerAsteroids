<template>
    <canvas width="500" height="500" style="CV" ref="gameCanvas" />
</template>

<script lang="ts">
import { NetworkConfig } from '@/tslib/config/NetworkConfig';
import { BulletData } from '@/tslib/dataObjects/BulletData';
import { PlayerControlData } from '@/tslib/dataObjects/PlayerControlData';
import { PlayerData } from '@/tslib/dataObjects/PlayerData';
import { KeyHandler, KeyState } from '@/tslib/KeyHandler';
import { Player } from '@/tslib/Player';
import { Header } from '@/tslib/sockets/Header';
import { WebSocketService } from '@/tslib/sockets/WebSocketService';
import { DataStore } from '@/tslib/storage/DataStore';
import Electron from 'electron';
import { BrowserWindow } from 'electron';
import { clearTimeout, setTimeout } from 'timers';
import { TypedJSON } from 'typedjson';
import Vue from 'vue';
import { TImeoutHandler } from '../tslib/TimeoutHandler';

const GAME_CANVAS: string = 'gameCanvas';
export default Vue.extend ({
    name: 'GameCanvas',
    data() {
        return {
            currentPlayer: new Player(DataStore.token),
            players: new Array<PlayerData>(),
            bullets: new Array<BulletData>(),
            networkConfig: new NetworkConfig(),
            playerDataSocket: new WebSocketService(new NetworkConfig().getIpAddress() + '/game/player', DataStore.token),
            bulletDataSocket: new WebSocketService(new NetworkConfig().getIpAddress() + '/game/bullet', DataStore.token),
            playerDataSerializer: new TypedJSON(PlayerData),
            playerControlDataSerializer: new TypedJSON(PlayerControlData),
            bulletSerializer: new TypedJSON(BulletData),
            keyHandler: new KeyHandler(),
            gameLoop: new TImeoutHandler(),
            fireTimeout: new TImeoutHandler(),
            shoot: true,
        };
    },
    methods: {
        handlePress(): void {

            // Right
            this.currentPlayer.rotateLeft(this.keyHandler.getKeyState(37) === KeyState.DOWN);

            // Left
            this.currentPlayer.rotateRight(this.keyHandler.getKeyState(39) === KeyState.DOWN);

            // Up
            this.currentPlayer.increaseVelocity(this.keyHandler.getKeyState(38) === KeyState.DOWN);

            // Spacebar
            this.currentPlayer.fireBullet(this.keyHandler.getKeyState(32) === KeyState.DOWN);
        },
        init(): void {
            this.playerDataSocket.addMessageListener((message: Header) => {
                const pd: PlayerData[] = TypedJSON.parseAsArray(message.getData(), PlayerData);
                this.players = pd;
            });

            this.bulletDataSocket.addMessageListener((message: Header) => {

               const bd: BulletData[] = TypedJSON.parseAsArray(message.getData(), BulletData);
               this.bullets = bd;
            });

            this.gameLoop.setLoop(() => {
                this.render();
                this.sendPlayerData();
            }, 20);
        },
        render(): void {
            this.handlePress();
            const canvas: HTMLCanvasElement = this.$refs[GAME_CANVAS] as HTMLCanvasElement;
            let context = canvas.getContext('2d');

            if (context === null) {
                context = new CanvasRenderingContext2D();
            }

            context.fillStyle = 'black';
            context.fillRect(0, 0, DataStore.gameWidth, DataStore.gameHeight);
            for (const bullet of this.bullets) {
              bullet.render(context);
            }

            for (const player of this.players) {
                player.render(context);
            }
        },
        sendPlayerData(): void {
            const serialisedPlayer: string = this.playerControlDataSerializer.stringify(this.currentPlayer.getPlayerData());
            this.playerDataSocket.sendMessage(serialisedPlayer);
        },
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.gameLoop.clearLoop();
        this.playerDataSocket.close();
        this.bulletDataSocket.close();
    },
});
</script>
