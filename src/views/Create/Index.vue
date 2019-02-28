<template>
  <v-form ref="form" class="full-width" v-model="valid">
    <v-container grid-list-md>
      <v-card flat>
        <v-card-title primary-title>
          <v-flex xs12>
            <div>
              <h2 class="headline">{{ $t('createForm.PostNew.title') }}</h2>
              <!-- Random text -->
              <span class="grey--text">{{ $t("createForm.PostNew.subTitle") }}</span>
            </div>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex sm12>
              <h4>{{ $t("createForm.info") }}</h4>
            </v-flex>
            <!--Name-->
            <v-flex sm6 xs12>
              <v-text-field
                v-model="form.name"
                :rules="[rules.required]"
                label="Name"
                placeholder="Just the title"
                required
              ></v-text-field>
            </v-flex>

            <!--Short desc-->
            <v-flex sm6 xs12>
              <v-text-field
                v-model="form.shortDesc"
                :rules="[rules.required, rules.max60]"
                label="Short description"
                counter="60"
                placeholder="Short description"
                required
              ></v-text-field>
            </v-flex>

            <!-- Link -->
            <!-- TODO: Check link format -->
            <!-- https://www.regextester.com/93652 -->
            <v-flex sm6 xs12>
              <v-text-field
                v-model="form.link"
                :rules="[rules.required]"
                label="Link"
                placeholder="Example: https://osweekends.com/"
                required
              ></v-text-field>
            </v-flex>

            <!-- Dropdown Tags -->
            <v-flex sm6 xs12>
              <v-select
                v-model="form.tags"
                :rules="[rules.required]"
                :items="tagList"
                placeholder="Tags"
                @change="checkIfEmpty"
                multiple
                label="Tags"
              ></v-select>
            </v-flex>

            <!-- Long desc -->
            <v-flex xs12>
              <v-textarea
                label="Full description"
                :rules="[rules.required]"
                v-model="form.fullDesc"
                placeholder="Full description"
                rows="4"
              ></v-textarea>
            </v-flex>

            <v-flex xs12>
              <h4>{{ $t("createForm.media") }}</h4>
            </v-flex>

            <!-- InputFile -->
            <v-flex sm6 xs12>
              <v-text-field
                v-model="form.imgName"
                :rules="[rules.required]"
                label="Thumbnail"
                readonly
                append-icon="add_a_photo"
                clearable
                @click="$refs.inputFile.click()"
                @click:clear="clearImage"
                placeholder="Select image"
                required
              ></v-text-field>
              <input
                type="file"
                ref="inputFile"
                class="input-file"
                @input="changeFile"
                accept="image/*"
              >
            </v-flex>

            <!-- Image Preview -->
            <v-flex sm6 xs12>
              <template v-if="mainImg.base64">
                <img :src="mainImg.base64" class="main-img-preview" alt="Main resource Image">
              </template>
            </v-flex>

            <!-- Submit btn -->
            <div class="form-buttons">
              <v-btn
                color="primary"
                @click="validateForm('form')"
                :disabled="isLoading"
                :loading="isLoading"
              >{{ $t("createForm.submitBtn") }}</v-btn>
            </div>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import rules from '@/utils/rules'
import tagList from '@/utils/tags'

export default {
  data: () => {
    return {
      isLoading: false,
      form: {
        name: '',
        shortDesc: '',
        fullDesc: '',
        link: '',
        tags: null
      },
      valid: true,
      mainImg: {
        size: 0,
        name: '',
        type: '',
        base64: ''
      },
      rules,
      tagList
    }
  },
  methods: {
    changeFile (ev) {
      if (ev.target.files.length > 0) {
        const file = ev.target.files[0]
        this.form.imgName = file.name
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => {
            this.mainImg.name = file.name
            this.mainImg.size = file.size
            this.mainImg.type = file.type
            this.mainImg.base64 = reader.result
          },
          false
        )
        // FileReader.readAsDataURL()
        reader.readAsDataURL(file)
      } else {
        this.clearImage()
      }
    },
    clearImage () {
      this.$refs.inputFile.value = ''
      this.mainImg.size = 0
      this.mainImg.name = ''
      this.mainImg.type = ''
      this.mainImg.base64 = ''
    },
    validateForm (form) {
      if (this.$refs.form.validate()) {
        this.submitForm()
      } else {
        console.debug('Invalid Form')
      }
    },
    async submitForm () {
      try {
        this.isLoading = true
        const promises = []
        const docRef = await this.$store.dispatch('createDocRef')
        const resourceData = {
          id: docRef.id,
          ...this.form,
          createdAt: new Date(),
          media: {
            mainImg: ''
          },
          favsCount: 0,
          likesCount: 0
        }
        const imgData = {
          id: docRef.id,
          file: this.$refs.inputFile.files[0]
        }
        promises.push(this.$store.dispatch('createResource', resourceData))
        promises.push(this.$store.dispatch('uploadResourceImg', imgData))

        const results = await Promise.all(promises)

        // Remove this code when cloud functions be implemented
        const downloadURL = await results[1].ref.getDownloadURL()
        await this.$store.dispatch('createResource', {
          id: docRef.id,
          media: {
            mainImg: downloadURL
          }
        })
        // *****************************************************
        this.isLoading = false
      } catch (err) {
        console.log('Error [Submit Form]:')
        console.log(JSON.stringify(err))
        this.isLoading = false
      }
    },
    checkIfEmpty (e) {
      if (e.length === 0) {
        // Reset for validation
        this.form.tags = null
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.full-width {
  width: 100%;
}

.input-file {
  display: none;
}

.main-img-preview {
  width: 150px;
  max-height: 200px;
}

.form-buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
