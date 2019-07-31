<template>
  <div class="home">
    <div class="gameContainer">
      <GameCanvas />
      <div class="playerContainer">
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { NetworkConfig } from '@/tslib/config/NetworkConfig';
import { PlayerData } from '@/tslib/dataObjects/PlayerData';
import { DataStore } from '@/tslib/storage/DataStore';
import { BrowserWindow } from 'electron';
import { Header } from '@/tslib/sockets/Header';
import { TypedJSON } from 'typedjson';
import { TImeoutHandler } from '../tslib/TimeoutHandler';
import Player from '@/components/Player.vue';
import GameCanvas from '@/components/GameCanvas.vue';
import { WebSocketService } from '@/tslib/sockets/WebSocketService';
import { PlayerStatistics } from '@/tslib/dataObjects/PlayerStatistics';
import Vue from 'vue';

export default Vue.extend ({
  components: {
    GameCanvas,
    Player,
  },
  data() {
    return {
      playerStatisticDataSocket: new WebSocketService(new NetworkConfig().getIpAddress() + '/game/playerStats', DataStore.token),
      statistics: new Array<PlayerStatistics>(),
    };
  },
  methods: {
    init(): void {
      this.playerStatisticDataSocket.addMessageListener((message: Header) =>{
        console.log(message.getData());
        const ps: PlayerStatistics[] = TypedJSON.parseAsArray(message.getData(), PlayerStatistics);
        this.statistics = ps;
      });
    },
  },
  mounted() {
        this.init();
    },
});
</script>
<style>
  .gameContainer{ 
    flex-direction: row
  }
</style>