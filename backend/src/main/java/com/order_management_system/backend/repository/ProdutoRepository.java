package com.order_management_system.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.order_management_system.backend.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer>{

}
