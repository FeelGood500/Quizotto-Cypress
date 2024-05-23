<template>
<nav class="container mb-4 mt-4">
        <div class="row">
            <div class="col-9"></div>
            <div class="col-3">
                <select class="custom-select" v-model="lang" @change="handleChange($event)">
                    <option value="pl">polski</option>
                    <option value="en">english</option>
                    <option value="de">Deutsch</option>
                </select>

            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';
 export default {
    data: function(){
        const lang = localStorage.getItem('lang') || 'pl';
        return {
            lang: lang
        }
    },
    methods: {
        handleChange(event){
            localStorage.setItem('lang', event.target.value)
            window.location.reload();
        }
    }
 };


</script>
