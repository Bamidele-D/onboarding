<template>
    <div class="w-full">
        <div>
            <h1 class="text-3xl font-bold">Customer Details</h1>
            <p class="text-[#494D4F] text-sm">We want to know more about you. </p>
        </div>
        <div class="mt-10">
            <form>
                <div class="flex gap-5 mb-5">
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">First Name</label>
                        <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Enter First Name" v-model="personalData.first_name" @blur="checkUserData('first_name')">
                        <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.first_name && filledUserData.first_name">{{ validateUserDetails.errors.first_name }}</div>
                    </div>
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">Last Name</label>
                        <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Enter Last Name" v-model="personalData.last_name" @blur="checkUserData('last_name')">
                        <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.last_name && filledUserData.last_name">{{ validateUserDetails.errors.last_name }}</div>
                    </div>
                </div>
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Phone Number</label>
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Phone Number" v-model="personalData.phone" @blur="checkUserData('phone')">
                    <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.phone && filledUserData.phone">{{ validateUserDetails.errors.phone }}</div>
                </div>

                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">BVN</label>
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="BVN" v-model="personalData.bvn" @blur="checkUserData('bvn')">
                    <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.bvn && filledUserData.bvn">{{ validateUserDetails.errors.bvn }}</div>
                </div>
                
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Email Address</label>
                    <input type="email" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Email Address" v-model="personalData.email_address" @blur="checkUserData('email_address')">
                    <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.email_address && filledUserData.email_address">{{ validateUserDetails.errors.email_address }}</div>
                </div>
                
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Password</label>
                    <input :type="showPassword ? 'text' : 'password'" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Password" v-model="personalData.password" @blur="checkUserData('password')">
                    <span @click="toggleShowPassword" class="cursor-pointer absolute right-[10px] top-[5px] translate-y-[50%] h-[40px] flex items-center">
                        <i class="ri-eye-off-line" v-if="showPassword"></i>
                        <i class="ri-eye-line" v-else></i>
                    </span>
                    <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.password && filledUserData.password">{{ validateUserDetails.errors.password }}</div>
                </div>
                
                <p class="text-sm text-[#62676A] text-center mt-5 mb-2">By clicking the “Create My Account” button, you agree to Kredi’s <a href="" class="font-bold underline">terms of acceptable use.</a></p>
                
                <div>
                    <button class="bg-[#1C2C35] h-[60px] w-full text-white font-semibold rounded-lg" :class="{'bg-[#1C2C3580] cursor-not-allowed' : !validateUserDetails.isValid}" @click.prevent="sendUserOTP()">{{loading ? 'Please wait...' : 'Continue →'}}</button>
                </div>
            </form>
            <div>
                <p class="text-center text-sm mt-5">Already have an account? <span class="text-red-500 font-bold">Log In</span></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { sendOTP } from "../services";
const props = defineProps([
    'personalData', 'increaseIndex'
]);
const showPassword = ref(false);
const filledUserData = ref({
    first_name: false,
    last_name: false,
    phone: false,
    email_address: false,
    password: false,
    bvn: false
});
const loading = ref(false);

// const validateInput = computed(() => {
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
//     const validEmail = emailPattern.test(form.value.email)
//     const validPhone = form.value.phone.length === 11
//     if (!validEmail) {
//         return true;
//     }
//     if (!validPhone) {
//         return true;
//     }
// })
function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}

const validateUserDetails = computed(() => {
    const { first_name, last_name, phone, email_address, password, bvn } = props.personalData;
    const errors = {};

    if (!first_name) {
        errors.first_name = 'First name is required';
    }
    if (!last_name) {
        errors.last_name = 'last name is required';
    }
    if (!phone) {
        errors.phone = 'Phone is required';
    }
    if (!email_address) {
        errors.email_address = 'Email Address is required';
    }
    if (!password) {
        errors.password = 'Password is required';
    }
    if (!bvn) {
        errors.bvn = 'bvn is required';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
});

const checkUserData = (userData) => {
    filledUserData.value[userData] = true;
}

const sendUserOTP = async () => {
    try {
        loading.value = true;
        const response = await sendOTP(props.personalData.email_address, props.personalData.phone);
        console.log(response);
        loading.value = false;
        if(response.status == 200) {
            props.increaseIndex();
        }
    } catch(err) {
        loading.value = false;
        console.log(err)
    }
}
</script>