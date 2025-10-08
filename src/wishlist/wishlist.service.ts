import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entities';
import { ProductVariant } from 'src/product_variant/entities/product_variant.entity';

@Injectable()
export class WishlistService {

  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepo: Repository<Wishlist>,
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @InjectRepository(ProductVariant)
    private readonly productVarintRepo: Repository<ProductVariant>
  ) { }
  async create(createWishlistDto: CreateWishlistDto) {

    const getUser = await this.userRepo.createQueryBuilder('wl')
      .where("wl.id = :id", { id: createWishlistDto.userId })
      .getOne();

    const getProduct = await this.productVarintRepo.createQueryBuilder('pv')
      .where("pv.id = :id", { id: createWishlistDto.productId })
      .getOne()
    if (!getUser || !getProduct) {
      throw new Error('User or Product not found');
    }
    const data = this.wishlistRepo.create({
      user: getUser,
      productVariant: getProduct,
      price: getProduct?.price
    })

    return await this.wishlistRepo.save(data)

  }

  async findAll() {
    const wishlists = await this.wishlistRepo.find({
      relations: ['user', 'productVariant', 'productVariant.label', 'productVariant.product'],
    });
    return wishlists.map(wl => ({
      id: wl.id,
      price: wl.price,
      createdAt: wl.created_at,
      userName: wl.user.name,
      productName: wl.productVariant.product.name,
      productPrice: wl.productVariant.price,
      labelValue: wl.productVariant.label?.value,
    }));
  }


  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  async remove(id: number) {
    const wishlist =   await this.wishlistRepo.createQueryBuilder('wl')
      .where("wl.id = :id", { id:id })
      .getOne();


    if (!wishlist) {
      throw new NotFoundException(`Wishlist with id ${id} not found`);
    }
    return await this.wishlistRepo.remove(wishlist)
  }

  async getWishListByUserId(id: number) {
    const wishlists = await this.wishlistRepo.createQueryBuilder('wl')
    .innerJoin('wl.user','user')
    .leftJoin('wl.productVariant','pv')
    .innerJoin('pv.product','p')
    .leftJoin('pv.label','pl')
    .leftJoin('pv.color','pc')

    .select([
      'wl.id as ID',
      'user.name as Name',
      'p.name as ProductName',
      'pv.price as Price',
      'wl.created_at as Created',
      'pl.value as LabelValue',
      'pc.value as Color'
    ])
    .where("wl.userId = :id",{id:id})
    .getRawMany()
    return wishlists;
    // return wishlists.map(data => ({
    //   id: data.id,
    //   price: data.price,
    //   createdAt: data.created_at,
    //   userName: data.user.name,
    //   productName: data.productVariant.product.name,
    //   productPrice: data.productVariant.price,
    //   labelValue: data.productVariant.label?.value,
    // }));
  }
}
