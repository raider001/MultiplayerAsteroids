<template>
    <button @click="action" type="buttonType">{{ title }}</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend ({
    name: 'AButton',
    props: {
        title: String,
        buttonType: String,
        action: Function,

    },
    data() {
        return {
            disableState: false,
        };
    },
    methods: {
    },
});


</script>