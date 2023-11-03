import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { DaoRecipeService } from '../../services/dao-recipe.service'
import { Recipe } from '../../../../bootstrap/models/models'
import { Router, ActivatedRoute } from '@angular/router'
import { AngularFireStorageReference } from '@angular/fire/compat/storage'
import { PLATE_TYPE, PROTEIN_CATEGORY } from '../../utils/client.constants'
import { MessageService } from 'src/app/shared/services/message.service'
import { FileStorageService } from 'src/app/shared/services/file-storage.service'

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent implements OnInit {
  form: FormGroup
  recipeTosave: Recipe = new Recipe()
  isEditForm: boolean
  recipeId: string
  hasPrice: boolean
  hasCategory: boolean
  imgURL: string
  fileName: string
  fileImg: AngularFireStorageReference
  uploadProgress: number
  showUploadButton: boolean
  isUploadingImg: boolean
  isUploadedImg: boolean

  PLATE_TYPE = PLATE_TYPE
  PROTEIN_CATEGORY = PROTEIN_CATEGORY

  constructor(
    private dao: DaoRecipeService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseStorage: FileStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initTitle()
    this.initForm()
    this.recipeId = this.route.snapshot.params['id']
    if (this.route.snapshot.routeConfig.path.includes('edit')) {
      this.initEditForm()
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      history: [null],
      proteinCategory: [null],
      imgURL: [null],
      price: [0],
    })
  }

  initEditForm() {
    this.isEditForm = true
    this.dao.getDocument(this.recipeId).subscribe((value) => {
      this.form.patchValue(value, { onlySelf: true })
      if (value?.price) this.hasPrice = true
      if (value?.proteinCategory) this.hasCategory = true
    })
  }

  changeType(ev) {
    if (ev == 'MAIN' || ev == 'EXTRA') {
      this.hasPrice = true
      this.hasCategory = true
      this.form.get('proteinCategory').setValidators([Validators.required])
      this.form.get('history').setValidators([Validators.required])
      this.form.get('price').setValidators([Validators.required])
      this.form.get('price').setValue(null)
      this.form.updateValueAndValidity()
    } else {
      this.hasPrice = false
      this.hasCategory = false
      this.form.get('proteinCategory').setValidators([])
      this.form.get('history').setValidators([])
      this.form.get('price').setValidators([])
      this.form.get('price').setValue(0)
      this.form.updateValueAndValidity()
    }
  }

  save(form) {
    if (form.invalid) return
    if (!this.isEditForm) {
      this.dao.createDocument(form.value).then((value) => this.router.navigate(['/recipe/detail', value.id]))
    } else {
      this.dao.updateDocument(this.recipeId, form.value).then(() => this.router.navigate(['/recipe/detail', this.recipeId]))
    }
  }

  updateImg(event) {
    this.fileName = event.target.files[0].name
    this.fileImg = event.target.files[0]
    this.showUploadButton = true
  }

  uploadFile() {
    this.isUploadingImg = true
    let uploadLink = this.firebaseStorage.getFileLink(this.fileName)
    let uploadCtrl = this.firebaseStorage.saveFile(this.fileName, this.fileImg)
    uploadCtrl.percentageChanges().subscribe((percentage) => {
      this.uploadProgress = Math.round(percentage)
      if (this.uploadProgress == 100) {
        this.showUploadButton = false
        this.isUploadingImg = false
        this.isUploadedImg = true
      }
    })
    uploadLink.getDownloadURL().subscribe((URL) => this.form.get('imgURL').setValue(URL))
  }

  initTitle() {
    this.messageService.setToolbarTitle(this.route.snapshot.data['title'])
  }
}
