﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SearchRecipes.Models;

#nullable disable

namespace SearchRecipes.Migrations
{
    [DbContext(typeof(RecipeDbContext))]
    [Migration("20221013081110_eight")]
    partial class eight
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("SearchRecipes.Models.Ingredient", b =>
                {
                    b.Property<int>("IngredientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IngredientId"), 1L, 1);

                    b.Property<string>("IngredientName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("IngredientId");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("SearchRecipes.Models.Quantity", b =>
                {
                    b.Property<int>("QtyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("QtyId"), 1L, 1);

                    b.Property<int>("IngredientId")
                        .HasColumnType("int");

                    b.Property<string>("QuantityR")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("RecipeId")
                        .HasColumnType("int");

                    b.HasKey("QtyId");

                    b.HasIndex("IngredientId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Quantities");
                });

            modelBuilder.Entity("SearchRecipes.Models.Recipe", b =>
                {
                    b.Property<int>("RecipeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RecipeId"), 1L, 1);

                    b.Property<string>("RecipeImgUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("RecipeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("RecipeSubtitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("RecipeUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(1000)");

                    b.HasKey("RecipeId");

                    b.ToTable("Recipes");
                });

            modelBuilder.Entity("SearchRecipes.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"), 1L, 1);

                    b.Property<string>("EmailId")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("UserId");

                    b.HasAlternateKey("EmailId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SearchRecipes.Models.WishList", b =>
                {
                    b.Property<int>("WishListId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WishListId"), 1L, 1);

                    b.Property<int>("RecipeId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("WishListId");

                    b.HasIndex("RecipeId");

                    b.HasIndex("UserId");

                    b.ToTable("WishLists");
                });

            modelBuilder.Entity("SearchRecipes.Models.Quantity", b =>
                {
                    b.HasOne("SearchRecipes.Models.Ingredient", "Ingredients")
                        .WithMany()
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SearchRecipes.Models.Recipe", "Recipe")
                        .WithMany()
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ingredients");

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("SearchRecipes.Models.WishList", b =>
                {
                    b.HasOne("SearchRecipes.Models.Recipe", "Recipe")
                        .WithMany()
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SearchRecipes.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Recipe");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}