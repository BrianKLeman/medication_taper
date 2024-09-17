import { Component, OnInit } from '@angular/core';
import { ShoppingItemsService, NOT_ENOUGH, ENOUGH, BUYING, IN_TROLLEY, IShoppingItems } from './shopping-items.service';

@Component({
  selector: 'app-shopping-board',
  templateUrl: './shopping-board.component.html',
  styleUrls: ['./shopping-board.component.css']
})
export class ShoppingBoardComponent implements OnInit {

  constructor(private shoppingService : ShoppingItemsService
  ){   

  }
  
  async ngOnInit() {
      this.Items = await this.shoppingService.getAllForPerson() ?? [];
    this.InTrolley = this.Items.filter((value : IShoppingItems) => 
    {
      return value.Status == IN_TROLLEY;
    });

    this.Buying = this.Items.filter((value : IShoppingItems) => 
    {
      return value.Status == BUYING;
    });

    this.NotEnough = this.Items.filter((value : IShoppingItems) => 
    {
      return value.Status == NOT_ENOUGH;
    });

    this.Enough = this.Items.filter((value : IShoppingItems) => 
    {
      return value.Status == ENOUGH;
    });
  }

  public Items : IShoppingItems[] = [];

  public NotEnough : IShoppingItems[] = [];
  public Enough : IShoppingItems[] = [];
  public InTrolley : IShoppingItems[] = [];
  public Buying : IShoppingItems[] = [];

  async onDropNotEnough(arg : any){
    var t = this.getItem();
    if(t){
      this.NotEnough.push(t);
      t.Status = NOT_ENOUGH;
      await this.shoppingService.UpdateItem(t);
    }
  }

  async onDropInTrolley(arg : any){
    var t = this.getItem();
    if(t){
      this.InTrolley.push(t);
      t.Status = IN_TROLLEY;
      await this.shoppingService.UpdateItem(t);
    }
  }

  async onDropEnough(arg : any){
    var t = this.getItem();
    if(t){
      this.Enough.push(t);
      t.Status = ENOUGH;
      await this.shoppingService.UpdateItem(t);
    }
  }

  async onDropBuying(arg : any){
    var t = this.getItem();
    if(t){
      this.Buying.push(t);
      t.Status = BUYING;
      await this.shoppingService.UpdateItem(t);
    }
  }

  allowDrop(arg : any){
    arg.preventDefault();
  }

  private draggedItemID : number = -1;
  dragStart(taskID : number){
    this.draggedItemID = taskID;
  }

  private getItem() : IShoppingItems | undefined{
    let t = this.rem(this.NotEnough);
    if(!t)
      t = this.rem(this.Enough);
    if(!t)
      t = this.rem(this.Buying);
    if(!t)
      t = this.rem(this.InTrolley);
    return t;
  }

  private rem(items : IShoppingItems[]) : IShoppingItems | undefined{
    
    let i = - 1;
    let t = items.find( (v : IShoppingItems, index : number) => { if( v.Id == this.draggedItemID) {i = index; return true; } else return false;});    
    if(t)
      items.splice(i,1);

    return t;
  }
}
