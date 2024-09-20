<script setup lang="ts">
    import { ref } from 'vue'
    import { getGeoData } from '../utils/api.ts'
    import WeatherDisplay from './WeatherDisplay.vue';
    import { Location } from '../types/locationType.ts';

    const locationName = ref('')
    const data = ref<Location[]>([])
    const selectedLocation = ref<Location | null>(null);

    const getData = () => {
        if (locationName.value.length > 2) {
            getGeoData(locationName.value)
                .then(geoData => {
                    if (geoData && Array.isArray(geoData.results)) {
                        data.value = geoData.results     
                    } else {
                        data.value = []
                    }
                })
                .catch(err => console.log('Error fetching geo data: ', err))
        } else {
            data.value = []
            selectedLocation.value = null;
        }
    }

    const selectLocation = (location: Location) => {
        selectedLocation.value = location;
        locationName.value = location.name;
        data.value = []
    }

</script>

<template>
    <div class="form">
        <input
            @input="getData"
            placeholder="Location name"
            type="text"
            class="input"
            v-model="locationName"
            autofocus
        />
        <ul v-if="data.length" class="dropdown">
            <li 
                v-for="location in data" 
                :key="location.id" 
                @click="selectLocation(location)"
                class="dropdown-item"
            >
                {{ location.name }} {{ location.country }}
            </li>
        </ul>
        
    </div>
    <WeatherDisplay v-if="selectedLocation !== null"  :selectedLocation="selectedLocation"/>
</template>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        position: relative;
    }
    .input {
        background-color: aliceblue;
        height: 60px;
        width: 200px;
        border: 2px solid #2e3c5a;
        font-size: 20px;
        color: #000;
        border-radius: 3px;
        box-sizing: border-box;
    }
    .dropdown {
        position: absolute;
        top: 70px;
        width: 200px;
        background-color: white;
        border: 1px solid #ccc;
        color:#000;
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 150px;
        overflow-y: auto;
        z-index: 1000;
    }

    .dropdown-item {
        padding: 10px;
        cursor: pointer;
    }

    .dropdown-item:hover {
        background-color: #f0f0f0;
    }
</style>