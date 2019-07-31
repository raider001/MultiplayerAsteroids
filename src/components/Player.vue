<template>
    <div class="playerContainer">
        <div class="name">
            {{ playerName }}
        </div> 
        <div class="item">
            Kills: {{ playerName }}
        </div> 
        <div class="item">
            Deaths: {{ playerName }}
        </div> 
    </div>
</template>
<script lang="ts">

import Vue from 'vue';

export default Vue.extend ({
    name: 'Player',
     props: {
         playerName: {
             type: String,
             required: true,
         },
         playerKills: {
             type: String,
             required: true,
         },
         playerDeaths: {
             type: String,
             required: true,
         },
     },
});
</script>
<style>
  .playerContainer{ 
    flex-direction: column
  }
</style>