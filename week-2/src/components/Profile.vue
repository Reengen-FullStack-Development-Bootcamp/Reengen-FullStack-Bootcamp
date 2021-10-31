<template>
  <div>
    <h2>Profile</h2>
    <div>
      <b-card bg-variant="light">
        <b-form-group
            label-cols-lg="3"
            label="Shipping Address"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
        >
          <b-form-group
              label="Street:"
              label-for="nested-street"
              label-cols-sm="3"
              label-align-sm="right"
          >
            <b-form-input
                v-model="address.street"
                :state="isStreetValid"
                id="nested-street"
                aria-describedby="nested-street-feedback"
            />
            <b-form-invalid-feedback id="nested-street-feedback">
              Enter at least 6 letters
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
              label="City:"
              label-for="nested-city"
              label-cols-sm="3"
              label-align-sm="right"
          >
            <b-form-input id="nested-city"></b-form-input>
          </b-form-group>

          <b-form-group
              label="State:"
              label-for="nested-state"
              label-cols-sm="3"
              label-align-sm="right"
          >
            <b-form-input id="nested-state"></b-form-input>
          </b-form-group>

          <b-form-group
              label="Country:"
              label-for="nested-country"
              label-cols-sm="3"
              label-align-sm="right"
          >
            <b-form-input id="nested-country"></b-form-input>
          </b-form-group>

          <b-form-group
              label="Ship via:"
              label-cols-sm="3"
              label-align-sm="right"
              class="mb-0"
              v-slot="{ ariaDescribedby }"
          >
            <b-form-radio-group
                class="pt-2"
                :options="['Air', 'Courier', 'Mail']"
                :aria-describedby="ariaDescribedby"
            ></b-form-radio-group>
          </b-form-group>
        </b-form-group>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      address: {
        street: ""
      }
    }
  },
  computed: {
    isStreetValid() {
      if (this.address.street === "") {
        return null
      } else if (this.address.street.length > 5) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
