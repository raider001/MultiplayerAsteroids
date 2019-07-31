<template>
  <div class="login">
    <h1>Please Register</h1>
    <label> UserName: </label>
    <input v-model="userName" />
    <label> password: </label> 
    <input v-model="password" />
    <AButton title="Register" type="button" :action="sendRequest"/>
    {{ result }}
  </div>
</template>
<script lang="ts">
import AButton from '@/components/AButton.vue';
import { NetworkConfig } from '@/tslib/config/NetworkConfig';
import { Response } from '@/tslib/requests/ResponseInterface';
import { UserAuthentication } from '@/tslib/requests/UserAuthentication';
import { Header } from '@/tslib/sockets/Header';
import { WebSocketRequestService } from '@/tslib/sockets/WebSocketRequestService';
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
    };
  },
  methods: {
    sendRequest(): void {
      const authData: UserAuthentication = new UserAuthentication(this.userName, this.password);
      const requestSocket: WebSocketRequestService = new WebSocketRequestService(this.networkConfig.getIpAddress() + '/register');

      requestSocket.setOnReply((replyData: Header) => {
       this.result = replyData.getData();
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