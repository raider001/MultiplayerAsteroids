<template>
  <div class="login">
    <h1>Please Login</h1>
    <label> UserName: </label>
    <input v-model="userName" />
    <label> password: </label> 
    <input v-model="password" />
    <AButton title="Login" type="button" :action="sendRequest"  />
    {{ result }}
  </div>
</template>
<script lang="ts">
import AButton from '@/components/AButton.vue';
import { NetworkConfig } from '@/tslib/config/NetworkConfig';
import { LoginData } from '@/tslib/dataObjects/LoginData';
import { Response } from '@/tslib/requests/ResponseInterface';
import { UserAuthentication } from '@/tslib/requests/UserAuthentication';
import { Header } from '@/tslib/sockets/Header';
import { WebSocketRequestService } from '@/tslib/sockets/WebSocketRequestService';
import { WebSocketService } from '@/tslib/sockets/WebSocketService';
import { DataStore } from '@/tslib/storage/DataStore';
import { TypedJSON } from 'typedjson';
import Vue from 'vue';

export default Vue.extend ({
  components: {
    AButton,
  },
  props: {

  },
  data() {
    return {
      userName: '',
      password: '',
      result: '',
      networkConfig: new NetworkConfig(),
      loginDataSerializer: new TypedJSON(LoginData),
    };
  },
  methods: {

    sendRequest(): void {
      const authData: UserAuthentication = new UserAuthentication(this.userName, this.password);
      const requestSocket: WebSocketRequestService = new WebSocketRequestService(this.networkConfig.getIpAddress() + '/login');

      requestSocket.setOnReply((replyData: Header) => {
        if (replyData.isSuccessful()) {
          DataStore.token = replyData.getToken();
          this.loginDataSerializer.parse(replyData.getData());
          const data: LoginData = this.loginDataSerializer.parse(replyData.getData()) as LoginData;
          DataStore.gameWidth = data.gameWidth;
          DataStore.gameHeight = data.gameHeight;
          this.$router.push({name: 'main'});
        } else {
          const data: LoginData = this.loginDataSerializer.parse(replyData.getData()) as LoginData;
          this.result = data.message;
        }
      });

      const userdata = {
        userName: this.userName,
        password: this.password,
      };

      const dataString: string = JSON.stringify(userdata);
      requestSocket.sendRequest(dataString);
    },
  },
});
</script>
<style>
.login {
  display: flex;
  flex-direction: column;
}
</style>