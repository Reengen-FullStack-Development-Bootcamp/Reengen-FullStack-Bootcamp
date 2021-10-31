import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store"
import Home from "../views/Home.vue";
import SearchMovie from "@/components/SearchMovie";
import MovieDetails from "@/components/MovieDetails";
import ActorDetails from "@/components/ActorDetails";
import Chart from "@/components/Chart";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search-movie",
    name: "SearchMovie",
    component: SearchMovie,
  },
  {
    path: "/chart",
    name: "Chart",
    component: Chart,
  },
  {
    path: "/movie-detail/title/:id",
    name: 'movie-details',
    component: MovieDetails
  },
  {
    path: "/actor/name/:id",
    name: 'actor-details',
    component: ActorDetails,
    beforeEnter: (next) => {
      store.commit('SET_ACTOR_DETAIL', {type: 'del'})
      next();
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
