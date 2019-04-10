<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIdeasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ideas', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            
            $table->increments('id');
            $table->string('title');
            $table->boolean('success');
            $table->mediumText('pitch');
            $table->string('status');
            $table->string('category');
            $table->mediumText('tags')->nullable($value = true);
            $table->longText('description');
            $table->mediumInteger('darts')->default('0');
            $table->string('image')->nullable($value = true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ideas');
    }
}
