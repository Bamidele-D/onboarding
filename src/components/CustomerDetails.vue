<template>
    <div class="w-full">
        <div>
            <span class="cursor-pointer" @click="decreaseIndex()">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20.3389L4 12.3389M4 12.3389L12 4.33887M4 12.3389H18.5" stroke="#111111" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
                </svg>
            </span>
            <h1 class="text-3xl font-bold mt-4">Customer Details</h1>
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
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Phone Number" v-model="personalData.phone" @blur="checkUserData('phone')" @keypress="numbersOnly" maxlength="11">
                    <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.phone && filledUserData.phone">{{ validateUserDetails.errors.phone }}</div>
                </div>
                
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">BVN</label>
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="BVN" v-model="personalData.bvn" @blur="checkUserData('bvn')" maxlength="11" @keypress="numbersOnly">
                    <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.bvn && filledUserData.bvn">{{ validateUserDetails.errors.bvn }}</div>
                </div>
                
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Email Address</label>
                    <input type="email" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Email Address" v-model="personalData.email" @blur="checkUserData('email')">
                    <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.email && filledUserData.email">{{ validateUserDetails.errors.email }}</div>
                </div>
                
                <div class="flex flex-col mb-5 relative">
                    <label for="" class="text-sm text-[#62676A]">Password</label>
                    <input :type="showPassword ? 'text' : 'password'" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Password" v-model="personalData.password" @blur="checkUserData('password')">
                    <span @click="toggleShowPassword" class="cursor-pointer absolute right-[10px] top-[5px] translate-y-[50%] h-[40px] flex items-center">
                        <i class="ri-eye-off-line" v-if="showPassword"></i>
                        <i class="ri-eye-line" v-else></i>
                    </span>
                    <div class="text-red-500 text-xs mt-1" v-if="validateUserDetails.errors.password && filledUserData.password">{{ validateUserDetails.errors.password }}</div>
                </div>
                
                <p class="text-sm text-[#62676A] text-center mt-5 mb-2">By clicking the “Continue” button, you agree to Kredi’s <a href="javascript:void(0)" @click="redirectToTerms()" class="font-bold underline cursor-pointer">terms of acceptable use.</a></p>
                
                <div>
                    <button class="h-[60px] w-full text-white font-semibold rounded-lg" :class="{'bg-[#1C2C3580] cursor-not-allowed' : !validateUserDetails.isValid, 'bg-[#1C2C35]': validateUserDetails.isValid}" :disabled="!validateUserDetails.isValid && isVerifying" @click.prevent="verifyCustomerData()">{{loading ? 'Please wait...' : 'Continue →'}}</button>
                </div>
            </form>
            <div>
                <p class="text-center text-sm mt-5">Already have an account? <a class="text-red-500 font-bold cursor-pointer" :href="redirectLink">Log In</a></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { sendOTP, redirectToTerms, verifyCustomer } from "../services";
import { numbersOnly } from "../helpers";
const props = defineProps({
    personalData: {
        type: Object,
        required: true,
    },
    increaseIndex: {
        type: Function,
        required: true,
    },
    decreaseIndex: {
        type: Function,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
    },
    redirectLink: {
        type: String,
        required: true,
    },
    apikey: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});

import { createToaster } from '@meforma/vue-toaster';
const toast = createToaster({ position: 'top-right' });

const dateInput = ref(null);

const showPassword = ref(false);
const filledUserData = ref({
    first_name: false,
    last_name: false,
    phone: false,
    email: false,
    password: false,
    bvn: false
});
const loading = ref(false);
const isVerifying = ref(true);

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}

const validateUserDetails = computed(() => {
    const { first_name, last_name, phone, email, password, bvn } = props.personalData;
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (!first_name) {
        errors.first_name = 'First name is required';
    }
    if (!last_name) {
        errors.last_name = 'last name is required';
    }
    if (phone.length < 11) {
        errors.phone = 'Invalid Phone number';
    }
    if (!emailPattern.test(email)) {
        errors.email = 'Invalid Email Address';
    }
    if (!password) {
        errors.password = 'Password is required';
    }
    if(password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }
    if (bvn.length < 11) {
        errors.bvn = 'Invalid BVN';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
});

const checkUserData = (userData) => {
    filledUserData.value[userData] = true;
}

const verifyCustomerData = async () => {
    try {
        loading.value = true;
        isVerifying.value = false;
        const payload = {
            email: props.personalData.email,
            phone: props.personalData.phone
        }
        const response = await verifyCustomer(payload, props.apikey, props.token);
        loading.value = false;
        if (props.accountType === 'personal') {
            if (response.data.email && response.data.phone) {
                toast.error("Email address and Phone number exists");
            } else if (!response.data.email && response.data.phone) {
                toast.error("Phone number exists");
            } else if (response.data.email && !response.data.phone) {
                toast.error("Email address exists");
            } else {
                sendUserOTP();
            }
        } else if (props.accountType === 'business') {
            if (response.data.email && response.data.phone) {
                toast.error("Email address and Phone number exists");
            } else if (response.data.email && !response.data.phone) {
                toast.error("Email address exists");
            } else {
                sendUserOTP();
            }
        }
        
    } catch(err) {
        loading.value = false;
        console.log(err)
        toast.error(err.response.data.message || err.response.message);
    }
}

const sendUserOTP = async () => {
    try {
        loading.value = true;
        const response = await sendOTP(props.personalData.email, props.personalData.phone, props.apikey, props.token);
        toast.success(response.message);
        loading.value = false;
        if(response.status == 200) {
            props.increaseIndex();
        }
    } catch(err) {
        loading.value = false;
        console.log(err)
        toast.error(err.response.data.message || err.response.message);
    }
}

</script>