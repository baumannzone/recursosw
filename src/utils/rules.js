const rules = {
  required (v) { return (v && !!v) || 'Field required' },
  email (v) { return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid' },
  max60 (v) { return (v.length <= 60) || 'This field must be equal or less than 60' },
  min10 (v) { return (v.length <= 60) || 'This field must be equal or greater than 10' }
}

export default rules
