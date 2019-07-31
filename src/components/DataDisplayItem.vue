<template>
<div>
    <label> {{ itemName }} </label>
    <label> {{ value }} </label>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend ({
    name: 'DataDisplayItem',
    props: {
        itemName: {
            type: String,
            required: true,
        },
        value: {
            type : String,
            required: true,
        },
    },
});
</script>