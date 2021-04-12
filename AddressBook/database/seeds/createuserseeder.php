<?php

use Illuminate\Database\Seeder;
use App\User;

class createuserseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = 
        [
            [
                'name'     => 'Muhammad Haseeb',
                'email'    => 'muhammadhaseeb@gmail.com',
                'is_admin' => '1',
                'password' => bcrypt('haseeb123'),
            ],

            [
                'name'     => 'User',
                'email'    => 'user@gmail.com',
                'is_admin' => '0',
                'password' => bcrypt('user123'),
            ]
        ];

        foreach($user as $values)
        {
            User::Create($values);
        }
    }
}
