<?php

namespace App\DataFixtures;

use App\Entity\Car;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use Faker;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = (new Faker\Factory())::create();
        $faker->addProvider(new Faker\Provider\Fakecar($faker));

        for ($i = 0; $i < 20; $i++) {
            $car = new Car();
            $car->setName($faker->vehicle());
            $manager->persist($car);
        }

        $manager->flush();
    }
}
