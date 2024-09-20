<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { Location } from '../types/locationType';
  import { getWeather } from '../utils/api';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
  } from 'chart.js';

  const props = defineProps<{ selectedLocation: Location | null }>()

  ChartJS.register(Title, LineElement, PointElement, CategoryScale, LinearScale);

  const errorMessage = ref<string | null>(null);
  const dailyWeatherData = ref<any>(null);
  const currentTemperature = ref<number | null>(null);
  const chartData = ref<{
      labels: string[];
      datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string }[];
    }>({
      labels: [],
      datasets: [],
  });

  const chartOptions = ref({
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
    },
  });

  const getData = () => {
    if (props.selectedLocation) {
      getWeather(
        props.selectedLocation.latitude,
        props.selectedLocation.longitude,
        props.selectedLocation.timezone
      ) 
        .then(weather => {
          errorMessage.value = null;
          dailyWeatherData.value = weather.daily
          currentTemperature.value = weather.current.temperature_2m;

          chartData.value = {
              labels: dailyWeatherData.value.time,
              datasets: [
                {
                    label: 'Max Temperature (°C)',
                    data: dailyWeatherData.value.temperature_2m_max,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Min Temperature (°C)',
                    data: dailyWeatherData.value.temperature_2m_min,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                },
              ],
          };

          chartOptions.value = {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `7-Day Weather Forecast for ${(props.selectedLocation as Location).name} ${(props.selectedLocation as Location).country}`,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Temperature (°C)',
                },
              },
            },
          };
        })
          .catch(err => {
            errorMessage.value = `We're sorry, but weather data for ${(props.selectedLocation as Location).name} cannot be fetched.`;
            console.log(err)
          })
    } 
  }
  
  watch(() => props.selectedLocation, getData, { immediate: true });
</script>

<template>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div v-else-if="errorMessage === null">
        <p v-if="currentTemperature !== null" class="currentTemp">
          Current Temperature: {{ currentTemperature }} °C
        </p>
    <Line v-if="chartData" :data="chartData" :options="chartOptions" style="width: 800px"/>
    </div>

</template>

<style scoped>
  .error {
    color: red;
    text-align: center;
    font-size: 1.2rem;
  }
  .currentTemp {
    color: #000;
  }
  
</style>