<?php

namespace ApiBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use CoreBundle\Document\Todo;
use CoreBundle\Form\TodoType;

class TodoController extends Controller
{
    /**
     * list of todo's.
     * 
     * @Rest\View
     */
    public function listAction()
    {
        $dm = $this->get('doctrine_mongodb')->getManager();
        $todos = $dm->getRepository('CoreBundle:Todo')->findAll();

        return $todos;
    }

    /**
     * save Todo.
     *
     * @Rest\Post
     * @Rest\View
     * @param Request $request
     */
    public function saveAction(Request $request)
    {
        $dm = $this->get('doctrine_mongodb')->getManager();
        if ($id = $request->get('id')) {
            if (!$todo = $dm->getRepository('CoreBundle:Todo')->find($id)) {
                throw $this->createNotFoundException('No Todo found with id: '.$id);
            }
        } else {
            $todo = new Todo();
        }

        $form = $this->createForm(new TodoType(), $todo);
        $form->handleRequest($request);
        if ($form->isValid())
        {
            $dm->persist($todo);
            $dm->flush();

            return $todo;
        }

        return View::create($form, 400);
    }

    /**
     * Set all Todo's as complete.
     * 
     * @Rest\Post("/switch-complete")
     * @Rest\View
     * @param Request $request
     * @return array
     */
    public function switchCompleteAction(Request $request)
    {
        $dm = $this->get('doctrine_mongodb')->getManager();
        $res = $dm->getRepository('CoreBundle:Todo')
                  ->switchComplete($request->get('allComplete'));

        if (!$res['err']) {
            return ['status' => true];
        } else {
            return ['status' => false];
        }
    }

    /**
     * get Todo.
     * 
     * @Rest\View
     * @param integer $id
     * @return Todo
     */
    public function getAction($id)
    {
        $dm = $this->get('doctrine_mongodb')->getManager();
        $todo = $dm->getRepository('CoreBundle:Todo')->find($id);

        if(!$todo) {
            throw $this->createNotFoundException('No Todo found with id: '.$id);
        }

        return $todo;
    }

    /**
     * delete todo.
     * 
     * @Rest\Delete
     * @Rest\View
     * @param type $id
     */
    public function deleteAction($id)
    {
        $dm = $this->get('doctrine_mongodb')->getManager();
        $todo = $dm->getRepository('CoreBundle:Todo')->find($id);

        if(!$todo) {
            throw $this->createNotFoundException('No Todo found with id: '.$id);
        }

        $dm->remove($todo);
        $dm->flush();

        return ['status' => true];
    }
}
