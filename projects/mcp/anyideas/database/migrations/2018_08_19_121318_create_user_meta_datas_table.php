<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserMetaDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_meta_datas', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            
            $table->increments('id');
            $table->string('occupation')->nullable($value = true);
            $table->string('website')->nullable($value = true);
            $table->mediumText('bio')->nullable($value = true);
            $table->string('avatar')->nullable($value = true);
            $table->mediumText('following')->nullable($value = true); // IDEAS YOU FOLLOW
            $table->mediumText('followers')->nullable($value = true); // PEOPLE FOLLOWING YOUR IDEAS / SUPPORTERS
            $table->mediumText('likes')->nullable($value = true); // object of [discussion, discussion replies, updates, timelines, ideas] likes
            $table->mediumText('social_media')->nullable($value = true);
            $table->mediumText('interests')->nullable($value = true);
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
        Schema::dropIfExists('user_meta_datas');
    }
}
