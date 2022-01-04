<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Repository\CarRepository;
use App\Service\UserService as ServiceUserService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use UserService;

class CarsController extends ApiController
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
   * @param Request $request
   * @param EntityManagerInterface $entityManager
   * @return JsonResponse
   * @throws \Exception
   * @Route("/api/c/comment-car", name="comment_car", methods={"POST"})
   */
    public function addComment(Request $request, EntityManagerInterface $entityManager, CarRepository $carRepository, ServiceUserService $userService){

        try{
            $request = $this->transformJsonBody($request);
        
            if (!$request || !$request->get('content') || !$request->get('car')){
                throw new \Exception();
            }
    
            $comment = new Comment();
            $comment->setContent($request->get('content'));
            $comment->setCar($carRepository->find($request->get('car')));
            $comment->setUser($userService->getCurrentUser());
            $entityManager->persist($comment);
            $entityManager->flush();
        
            $data = [
                'status' => 200,
                'success' => "Comment added successfully",
            ];
            return $this->response($data);
    
        }catch (\Exception $e){
            $data = [
                'status' => 422,
                'errors' => "Data no valid",
            ];
            return $this->response($data, 422);
        }
    
    }
}
