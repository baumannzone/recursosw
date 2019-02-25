<template>
  <v-form ref="form" class="full-width" v-model="valid">
    <v-container grid-list-md>
      <v-card flat>
        <v-card-title primary-title>
          <v-flex xs12>
            <div>
              <h2 class="headline">Publica un nuevo recurso</h2>
              <!-- Random text -->
              <span class="grey--text">My super duper new resource</span>
            </div>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex sm12>
              <h4>Info</h4>
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
              <h4>Media</h4>
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
                @click="submitForm('form')"
                :disabled="isLoading"
                :loading="isLoading"
              >Submit</v-btn>
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
  created () {
    this.rules = rules
  },
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
      tagList: tagList
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
    submitForm (form) {
      if (this.$refs.form.validate()) {
        const data = {
          ...this.form,
          createdAt: new Date(),
          media: {
            mainImg: ''
          },
          favsCount: 0,
          likesCount: 0
        }
        this.isLoading = true
        this.$store
          .dispatch('createResource', data)
          .then(docRef => {
            const data = {
              id: docRef.id,
              img: this.mainImg.base64
            }
            this.$store.dispatch('uploadResourceImg', data).then(snapshot => {
              snapshot.ref.getDownloadURL().then(downloadURL => {
                console.log('File available at', downloadURL)
                this.$store
                  .dispatch('updateResourceImg', {
                    id: docRef.id,
                    img: downloadURL
                  })
                  .then(() => {
                    console.log('Document successfully updated!')
                    this.isLoading = false
                    this.$router.push('/')
                  })
              })
            })
          })
          .catch(err => {
            console.log('err: ')
            console.log(err)
            this.isLoading = false
          })
      } else {
        console.log('NO ES VALIDO')
      }
    },
    checkIfEmpty (ev) {
      if (ev.length === 0) {
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
