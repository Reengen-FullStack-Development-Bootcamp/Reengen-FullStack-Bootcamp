import About from "@/components/About";
import Help from "@/components/Help";
import Profile from "@/components/Profile";

export const routes = [
    {path: '/about/:id', component: About},
    {path: '/help', component: Help, props: {msg: 'Hello'}},
    {path: '/profile', component: Profile}
]
