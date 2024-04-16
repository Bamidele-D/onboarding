<template>
  <div class="flex">
    <SidebarView />
    <div class="px-36 py-20 w-[calc(100%_-_18rem)] h-screen overflow-y-scroll ">
      <div class="mb-[40px]">
        <div class="w-full h-[4px] bg-[#F4F9FD] mb-[5px]">
          <div class="bg-[#00DE59] h-full w-full" :style="{ width: progressWidth }"></div>
        </div>
        <span>{{ progressIndex }}/{{ totalProgressIndex }}</span>
      </div>
      <GetStarted :accountType="accountType" :selectAccountType="selectAccountType" :increaseIndex="increaseIndex"  v-if="progressIndex == 0" :decreaseIndex="decreaseIndex" />

      <CustomerDetails :personalData="personalData" :increaseIndex="increaseIndex" v-if="progressIndex == 1" :decreaseIndex="decreaseIndex" />

      <OTPView :personalData="personalData" :increaseIndex="increaseIndex" v-if="progressIndex == 2" :decreaseIndex="decreaseIndex" />

      <BVNVerification  :personalData="personalData" :increaseIndex="increaseIndex" :accountType="accountType" :progressIndex="progressIndex" :totalProgressIndex="totalProgressIndex" v-if="progressIndex == 3" :decreaseIndex="decreaseIndex" />

      <BusinessRegistration :personalData="personalData" :businessData="businessData" :increaseIndex="increaseIndex" v-if="progressIndex == 4" :decreaseIndex="decreaseIndex" />

      <RegistrationCompleted v-if="progressIndex == 5" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SidebarView from "../components/SidebarView.vue";
import ContentArea from "../components/ContentArea.vue";
import GetStarted from "../components/GetStarted.vue";
import CustomerDetails from "../components/CustomerDetails.vue";
import OTPView from "../components/OTPView.vue";
import BVNVerification from "../components/BVNVerification.vue";
import BusinessRegistration from "../components/BusinessRegistration.vue";
import RegistrationCompleted from "../components/RegistrationCompleted.vue";

const accountType = ref("");
const progressIndex = ref(0);
const totalProgressIndex = ref(5);
const progressBarWidth = ref(0);
const personalData = ref({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  bvn: ""
});

const businessData = ref({
    organisation_name: "",
    type_of_business: "",
    date_of_incorporation: "",
    country: "",
    address: "",
    phone_no: personalData.value.phone,
})

const progressWidth = computed(() => {
  return `${progressBarWidth.value}%`
})

const selectAccountType = (user) => {
  accountType.value = user;
}

const increaseIndex = () => {
  progressIndex.value += 1;
  progressBarWidth.value += 20;
}

const decreaseIndex = () => {
  progressIndex.value -= 1;
  progressBarWidth.value -= 20;
}
</script>