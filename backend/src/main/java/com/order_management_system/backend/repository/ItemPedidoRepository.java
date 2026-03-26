package com.order_management_system.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.order_management_system.backend.model.ItemPedido;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Integer>{

}
