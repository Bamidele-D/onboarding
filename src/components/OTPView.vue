<template>
    <div class="w-full">
        <div>
            <h1 class="text-3xl font-bold">Enter the code</h1>
            <p class="text-[#494D4F] text-sm">Enter the OTP code sent to your email, be careful not to share the code
                with anyone.</p>
        </div>

        <div class="mt-20">
            <form action="">
                <div class="flex justify-center gap-5 mb-5">
                    <div class="my-4 flex justify-center">
                        <v-otp-input ref="otpInput" input-classes="otp-input" separator="&nbsp;&nbsp;" :num-inputs="6"
                            :should-auto-focus="true" :is-input-num="true"
                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
                            :placeholder="['0', '0', '0', '0', '0', '0']" @on-change="handleOnChange"
                            @on-complete="handleOnComplete" />
                    </div>
                </div>

                <div class="flex justify-center">
                    <button class="bg-[#1C2C35] h-[60px] w-[70%] text-white font-semibold rounded-lg" @click.prevent="verifyUserOTP()">{{ loading ? 'Please wait...' : 'Verify Email' }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { verifyOTP } from "../services";
const props = defineProps([
    'personalData', 'increaseIndex'
]);

const otp = ref("");
const loading = ref(false);

const handleOnChange = (e) => {
    otp.value = e;
};

const handleOnComplete = (e) => {
    otp.value = e;
};

const verifyUserOTP = async () => {
    try {
        loading.value = true;
        const response = await verifyOTP(props.personalData.email, props.personalData.phone, otp.value);
        console.log(response);
        loading.value = false;
        if (response.status == 200) {
            props.increaseIndex();
        }
    } catch (err) {
        loading.value = false;
        console.log(err)
    }
}
</script>

<style>
.one,
.two,
.three,
.four,
.five,
.six {
    width: 56px;
    height: 56px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-weight: 300;
}

@media screen and (max-width: 640px) {

    .one,
    .two,
    .three,
    .four,
    .five,
    .six {
        width: 46px;
        height: 46px;
    }
}
</style>