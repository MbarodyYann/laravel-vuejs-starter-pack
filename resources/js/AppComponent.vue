<template>
    <div>
        <v-app id="inspire">
            <Navbar></Navbar>
            <v-main>
                <v-container
                    class="py-8 px-6"
                    fluid
                >
                    <router-view></router-view>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    export default {
        components: {Navbar},
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
