<?php

namespace App\Controller;

use App\Repository\CarRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CarsController extends AbstractController
{
    /**
     * @Route("api/cars", name="cars", methods={"GET"})
     */
    public function getListCars(CarRepository $carRepository): Response
    {
        $cars = $carRepository->findAll();

        $data = [];
        foreach ($cars as $key => $value) {
            $data[] = [
                'id' => $value->getId(),
                'name' => $value->getName()
            ];
        }
        return $this->response($data);
    }

    /**
     * @Route("api/c/cars", name="c_cars", methods={"GET"})
     */
    public function getListCarsConnected(CarRepository $carRepository): Response
    {
        $cars = $carRepository->findAll();

        $data = [];
        foreach ($cars as $value) {
            $comments = [];
            foreach ($value->getComments() as $comment) {
                $comments[] = [
                    'id' => $comment->getId(),
                    'content' => $comment->getContent(),
                    'user' => $comment->getUser()->getUsername()
                ];
            }

            $data[] = [
                'id' => $value->getId(),
                'name' => $value->getName(),
                'comments' => $comments
            ];
        }
        return $this->response($data);
    }

    /**
   * Returns a JSON response
   *
   * @param array $data
   * @param $status
   * @param array $headers
   * @return JsonResponse
   */
    public function response($data, $status = 200, $headers = [])
    {
    return new JsonResponse($data, $status, $headers);
    }
}
