import {required, minLength, between} from 'vuelidate/lib/validators'

export const global = {
    data() {
        return {
            number: 100
        }
    },
    methods: {
        alertTitle(val) {
            alert(val)
        }
    },
    computed: {
        titleSize() {
            return this.title.length
        }
    },
    created() {
        console.log('created')
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        age: {
            between: between(20, 30)
        }
    }
}
