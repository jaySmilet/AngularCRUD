import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  angForm:FormGroup;
  product:any = {};

  constructor(private route: ActivatedRoute, private ps: ProductsService, 
    private fb: FormBuilder, private router: Router) {
    this.createForm();
   }

  createForm(){
    this.angForm = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ps.editProduct(params['id']).subscribe(res => {
         this.product = res;
      });
    });
  }

  updateProduct(ProductName, ProductDescription, ProductPrice, id) {
    this.route.params.subscribe(params => {
      this.ps.updateProduct(ProductName, ProductDescription, ProductPrice, params._id);
      this.router.navigate(['products']);
    })
  }
}
