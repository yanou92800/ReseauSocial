import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../components/Auth/Register.vue";
import allPublications from "../components/Publication/allPublications.vue";
import onePublication from "../components/Publication/onePublication.vue";
import updatePublication from "../components/Publication/updatePublication.vue";

import Profile from "../components/Profile/Profile.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/profile/:id",
		name: "Profile",
		component: Profile,
	},
	{
		path: "/allPublications",
		name: "allPublications",
		component: allPublications,
	},
	{
		path: "/onePublication/:id",
		name: "onePublication",
		component: onePublication,
	},
	{
		path: "/updatePublication/:id",
		name: "updatePublication",
		component: updatePublication,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
